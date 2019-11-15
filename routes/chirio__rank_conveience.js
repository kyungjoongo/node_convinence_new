var request = require("request");
var cheerio = require("cheerio");
var syncRequest = require('sync-request');


let url = 'http://www.officialcharts.com/charts/singles-chart/'

request({url: url, method: 'GET'}, function (error, response, body) {

    var $ = cheerio.load(body);

    var resultsJson = [];


    var i = 1;
    $('.chart-positions > tbody > tr').each(function () {


        //if ( i%5 ==2){
        var position = $(this).find('.position').text();
        var thmbnails = $(this).find('.cover').children().attr('src');
        var title = $(this).find('.title').children().text();
        var artist = $(this).find('.artist').children().text();


        if (thmbnails != undefined) {
            resultsJson.push({
                position: position,
                thmbnails: thmbnails,
                title:title,
                artist:artist

            })
        }


        //}


        i++;

    });


    console.log('##############', resultsJson);


})







