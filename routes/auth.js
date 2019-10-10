const express = require('express');
const {user} = require('../models');
const c = require('../config/envconfig.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const EmailValidator = require('email-validator');
const router = express.Router();


async function generatePassword(plainTextPassword) {
    const saltRounds = 10;
    let salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
}

async function comparePasswords(plainTextPassword, hash) {
    return await bcrypt.compare(plainTextPassword, hash);
}

function generateJWT(user) {
    console.log("generateJWT")
    return jwt.sign(user.email, c.jwt.secret)
}

function requireAuth(req, res, next) {
    if (!req.headers || !req.headers.authorization) {
        return res.status(401).send({message: 'No authorization headers.'});
    }

    const token_bearer = req.headers.authorization.split(' ');
    if (token_bearer.length != 2) {
        return res.status(401).send({message: 'Malformed token.'});
    }

    const token = token_bearer[1];
    return jwt.verify(token, c.jwt.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({auth: false, message: 'Failed to authenticate.'});
        }
        return next();
    });
}

router.get('/verification',
    requireAuth,
    async (req, res) => {
        return res.status(200).send({auth: true, message: 'Authenticated.'});
    });

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // check email is valid
    if (!email || !EmailValidator.validate(email)) {
        return res.status(400).send({auth: false, message: 'Email is required or malformed'});
    }

    // check email password valid
    if (!password) {
        return res.status(400).send({auth: false, message: 'Password is required'});
    }

    const auser = await user.findByPk(email);

    // check that user exists
    if (!auser) {
        return res.status(401).send({auth: false, message: 'email Unauthorized'});
    }

    // check that the password matches
    const authValid = await comparePasswords(password, auser.password)

    if (!authValid) {
        return res.status(401).send({auth: false, message: 'password Unauthorized'});
    }

    // Generate JWT
    const jwt = generateJWT(auser);

    res.status(200).send({auth: true, token: jwt, user: auser.email});
});

//register a new user
router.post('/', async (req, res) => {
    console.log('register a new user');
    const email = req.body.email;
    const plainTextPassword = req.body.password;
    const username = req.body.username;
    // check email is valid
    if (!email || !EmailValidator.validate(email)) {
        return res.status(400).send({auth: false, message: 'Email is required or malformed'});
    }

    // check email password valid
    if (!plainTextPassword) {
        return res.status(400).send({auth: false, message: 'Password is required'});
    }

    // find the user
    const auser = await user.findByPk(email);
    // check that user doesnt exists
    if (auser) {
        return res.status(422).send({auth: false, message: 'User may already exist'});
    }

    const password_hash = await generatePassword(plainTextPassword);

    const newUser = await new user({
        username: username,
        email: email,
        password: password_hash
    });

    let savedUser;
    try {
        savedUser = await newUser.save();
    } catch (e) {
        throw e;
    }

    // Generate JWT
    const jwt = generateJWT(savedUser);

    res.status(201).send({token: jwt, user: savedUser.email});
});

router.get('/', async (req, res) => {
    res.send('auth')
});

module.exports.router = router;
