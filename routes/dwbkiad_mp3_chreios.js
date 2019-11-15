var request = require("request");
var cheerio = require("cheerio");
var syncRequest = require('sync-request');


let url = 'https://youtubemp3api.com/@api/button/mp3/0hG_I8USKIc'
setTimeout(() => {
    request({url: url, method: 'GET'}, function (error, response, body) {

        var $ = cheerio.load(body);

        var resultsJson = [];


        $('.download-result > .download-mp3-url').each(function () {
            var link = $(this).attr('href')

            resultsJson.push({
                "link": link

            })

        });


        console.log('##############', resultsJson);


    })
}, 3000)







