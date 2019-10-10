var express = require('express');
var router = express.Router();

/* GET calendar listing. */
router.get('/:user', function(req, res, next) {
    var year = req.query.year;
    var month = req.query.month;

    res.send(year+" "+month);
});

module.exports = router;
