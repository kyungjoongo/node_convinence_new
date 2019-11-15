var express = require('express');
var router = express.Router();
var beautify = require("json-beautify");
var cheerio = require('cheerio');
var request = require('request');
var syncRequest = require('sync-request');
var querystring = require('querystring');
var striptags = require('striptags');
var prettyjson = require('prettyjson');
var fs = require('fs');

var client_id = 'NJ52okBkv2Fg5CGklQif';
var client_secret = '30vmVQ0p79';
const translate = require('translate');
translate.engine = 'google';
translate.key = 'AIzaSyAV-2b3UNzzvFsXWJzOjVTtaRnd1GHLlEU';

router.get('/google_label_form', function(req, res, next) {
    res.render('google_label_form', { title: 'Express' });
});


router.post('/get_google_label_detaction', function (req, last_response, next) {


    if (!req.files){
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    let name = req.files.sampleFile.name;
    let postFixRandNo = Math.floor((Math.random() * 500) + 1);
    google_label_detection
    let baseUrl = 'e:/upload/'
    let fixedName = 'temp_image'+ postFixRandNo+ '.jpg'

    console.log('##############', fixedName);

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(baseUrl + fixedName, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        // Imports the Google Cloud client library
        const vision = require('@google-cloud/vision');

        // Creates a client
        const client = new vision.ImageAnnotatorClient();

        // Performs label detection on the image file
        client.labelDetection(baseUrl + fixedName).then(async results => {

            const labels = results[0].labelAnnotations;
            var arrResults = [];

            for (let label of labels) {

                const desc = await translate(label.description, 'ko');

                arrResults.push({
                    desc: desc,
                    score: (label.score).toFixed(2) * 100 + "%"
                })
            }
            last_response.json(arrResults)
        })


    });



});


module.exports = router;
