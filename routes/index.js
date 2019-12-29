var express = require('express');
var router = express.Router();
var stream = require('express-stream');
/* GET home page. */
router.get('/', function (req, res, next) {

    var id;

    if (req.query.id === undefined) {
        id = '0hG_I8USKIc'
    } else {
        id = req.query.id;
    }


    res.render('index', {id: id});
});

router.get('/celme', function (req, res, next) {


    res.render('celme', {id: 'sdfsdfsd'});
});
const ndjson = require('ndjson');
const fs = require('fs');
router.get('/stream001', (req, res) => {
    let readStream = fs.createReadStream(__dirname + '/todos.ndjson').pipe(ndjson.parse());

    const chunks = [];
    readStream.on('data', (data) => {
        chunks.push(JSON.stringify(data));
    });

    readStream.on('end', () => {
        var id = setInterval(() => {
            if (chunks.length) {
                res.write(chunks.shift() + '\n');
            } else {
                clearInterval(id);
                res.end();
            }
        }, 500);
    });
});


module.exports = router;
