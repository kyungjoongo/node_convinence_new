var request = require("request");
var cheerio = require("cheerio");
var syncRequest = require('sync-request');


let url = 'https://mpgun.com/youtube-to-mp3.html?title=sdfsdf&yid=k2qgadSvNyU'

request({url: url, method: 'GET'}, function (error, response, body) {

    var $ = cheerio.load(body);

    var resultsJson = [];


    setTimeout(() => {

        let link = $(".downloadblock").children().attr('href');

        console.log('##############' + link);
    }, 1500)


    //console.log('##############'+ JSON.stringify(resultsJson));


})







