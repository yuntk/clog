const express = require('express');

const { user } = require( '../models/');

var AuthRouter = require('./auth.js').router;

var router = express.Router();

router.use('/auth', AuthRouter);

router.get('/', async (req, res) => {
    res.send('respond with a resource');
});

router.get('/:id', async (req, res) => {
    let { id } = req.params;
    const item = await user.findByPk(id);
    res.send(item);
});

module.exports = router;
