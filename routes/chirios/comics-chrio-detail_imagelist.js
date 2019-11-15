var request = require("request");
var cheerio = require("cheerio");
var syncRequest = require('sync-request');


let url = 'https://cointoon.net/comic_view/75316/%EB%A0%8C%ED%83%88%EA%B1%B8%EC%A6%88+11%ED%99%94'

request({url: url, method: 'GET'}, function (error, response, body) {

    var $ = cheerio.load(body);

    //console.log('##############', body);

    var resultsJson = [];


    $('.view_img > img ').each(function () {

        var image = $(this).attr('src');
        resultsJson.push({
            href: image,

        })

    });



    console.log('##############', resultsJson);


})
