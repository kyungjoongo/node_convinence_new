var request = require("request");
var cheerio = require("cheerio");
var syncRequest = require('sync-request');


let url = 'https://cointoon.net/comic/1348/%EB%A0%8C%ED%83%88%EA%B1%B8%EC%A6%88'

request({url: url, method: 'GET'}, function (error, response, body) {

    var $ = cheerio.load(body);

    //console.log('##############', body);

    var resultsJson = [];


    $('.toon_tlist > ul > li ').each(function () {

        var href = $(this).children().attr('href');
        var title = $(this).find('a').text();


        resultsJson.push({
            title: title,
            href: href,

        })


    });



    console.log('##############', resultsJson);


})
