var request = require("request");
var cheerio = require("cheerio");
var syncRequest = require('sync-request');


let url = 'https://www.shazam.com/charts/top-100/united-states'

request({url: url, method: 'GET'}, function (error, response, body) {

    var $ = cheerio.load(body);

    var resultsJson = [];


    $('.inner-content > .charttracks > ul  > li ').each(function () {

        var title = $(this).html();


        resultsJson.push({
            title: title,


        })


    });


    console.log('##############' + JSON.stringify(resultsJson));


})







