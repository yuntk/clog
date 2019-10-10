var express = require('express');
var router = express.Router();
const { user } = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  user.findAll().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
  });


  res.render('index', { title: 'myapp' });
});

module.exports = router;
