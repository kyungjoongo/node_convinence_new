var express = require('express');
var querystring = require('querystring');
var router = express.Router();
var beautify = require("json-beautify");
var cheerio = require('cheerio');
var request = require('request');
var striptags = require('striptags');
var prettyjson = require('prettyjson');
var fs = require('fs');
var youtubedl = require('youtube-dl');
var ffmpeg = require('fluent-ffmpeg');
var btc = require('better-try-catch')
const puppeteer = require('puppeteer');

router.get('/auction_best', function (req, last_response, next) {




    (async () => {


        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-gpu',
            ],
            /*args: [],*/
            dumpio: true,
        });


        const page = await browser.newPage();
        await page.goto('http://corners.auction.co.kr/corner/categorybest.aspx?catetab=9&selecteditemno=B532158855');
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

//    await page.waitForSelector('.hrefdownload');

        const dimensions = await page.evaluate(async () => {
            /*await new Promise(function (resolve) {
             setTimeout(resolve, 1000)
             });*/



            let resultsJson = [];


            $('.uxb-img> li').each(function () {

                var href = $(this).find('.img').children().attr('href')
                var rank = $(this).find('.rank').text();
                var text = $(this).find('em').children().text();
                var c_price = $(this).find('.c_price').children().children().text();
                var d_price = $(this).find('.d_price').children().children().text();
                var down = $(this).find('.down').text();
                var bigimagepath = $(this).find('.img').children().children().attr('bigimagepath')

                resultsJson.push({
                    href : href,
                    bigimagepath: bigimagepath,
                    rank:rank,
                    text:text,
                    d_price:d_price,
                    c_price:c_price,
                    down:down,

                })

            });


            return resultsJson;

        });

        await browser.close();

        console.log('##############', dimensions);

        last_response.json(dimensions)


    })();

});


module.exports = router;
