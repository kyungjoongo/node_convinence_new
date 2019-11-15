var request = require("request");
var cheerio = require("cheerio");
var syncRequest = require('sync-request');


let url = 'https://cointoon.net/comic'

request({url: url, method: 'GET'}, function (error, response, body) {

    var $ = cheerio.load(body);

    //console.log('##############', body);

    var resultsJson = [];


    $('div[class="week_box "]').each(function () {

        var title = $(this).find('h5').children().text();
        var href = $(this).find('h5').children().attr('href')
        var img = $(this).find('img').attr('src')


        resultsJson.push({
            title: title,
            href: href,
            img: img,

        })


    });



    console.log('##############', resultsJson);


})
