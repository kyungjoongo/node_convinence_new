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



    res.render('index_toast', { id: id });
});




module.exports = router;
