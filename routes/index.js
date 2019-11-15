var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    var id;

    if (req.query.id === undefined) {
        id = '0hG_I8USKIc'
    } else {
        id = req.query.id;
    }


    res.render('index', { id: id });
});

router.get('/celme', function(req, res, next) {



    res.render('celme', { id: 'sdfsdfsd' });
});




module.exports = router;
