var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const cheerio = require('cheerio')
var syncrequest = require('sync-request');
const puppeteer = require('puppeteer');
var beautify = require("json-beautify");
var Iconv1 = require('iconv').Iconv;

router.get('/uk_single', function (req, last_response, next) {


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

        last_response.json(resultsJson)


    })



});


router.get('/billboard_rank', function (req, last_response, next) {

    (async () => {
        const browser = await puppeteer.launch({
            headless: true

        });
        const page = await browser.newPage();

        var query = encodeURI('pink what about us album art')
        //await page.goto('https://www.youtube.com/playlist?list=PLx0sYbCqOb8QTF1DCJVfQrtWknZFzuoAE');


        //https://www.youtube.com/playlist?list=PLw-VjHDlEOgvtnnnqWlTqByAtC7tXBg6D
        await page.goto('https://www.billboard.com/charts/r-b-hip-hop-songs');
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {

            var resultsJson = [];

            //window.scrollBy(0, 10000);

            $("html, body").animate({ scrollTop: $(document).height() }, 500);


            await new Promise(function(resolve) {
                setTimeout(resolve, 1500)
            });



            var i = 1;
            $('.chart-row  ').each(function () {

                var rank = $(this).find('.chart-row__current-week').text();
                var thumbnail = $(this).find('.chart-row__image').attr('style')

                if ( thumbnail !=undefined && thumbnail!=null){
                    thumbnail = thumbnail.replace('background-image: url("', '').replace('")', '');
                }

                var song= $(this).find('.chart-row__song').text();
                //chart-row__artist
                var artist = $(this).find('.chart-row__artist').text();


                resultsJson.push({
                    rank: rank,
                    thumbnail: thumbnail,
                    artist: artist,
                    song: song,


                })

                i++;

            });

            return resultsJson;


        });

        await browser.close();


        for ( var i=0 ; i<dimensions.length;i++){

            let thumbnail= dimensions[i].thumbnail

            if ( thumbnail !=undefined && thumbnail!=null){
                thumbnail = thumbnail.replace('background-image: url("', '').replace('")', '');

                dimensions[i].thumbnail = thumbnail;
            }
        }

        console.log('##############', dimensions);

        last_response.json(dimensions)

    })();
});


module.exports = router;
