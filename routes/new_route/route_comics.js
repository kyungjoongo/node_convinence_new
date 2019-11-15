var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const cheerio = require('cheerio')
var syncrequest = require('sync-request');
const puppeteer = require('puppeteer');
var beautify = require("json-beautify");
var Iconv1 = require('iconv').Iconv;

router.get('/comics_detail_images', function (req, last_response, next) {


    let url = req.query.url

    if (req.query.url == undefined) {
        url = 'https://cointoon.net/comic_view/75316/%EB%A0%8C%ED%83%88%EA%B1%B8%EC%A6%88+11%ED%99%94'
    }


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
        last_response.json(resultsJson)

    })


});

router.get('/comics_detail', function (req, last_response, next) {

    let detail_url = req.query.detail_url

    if (req.query.detail_url == undefined) {
        detail_url = 'https://cointoon.net/comic/1348/%EB%A0%8C%ED%83%88%EA%B1%B8%EC%A6%88'
    }

    request({url: detail_url, method: 'GET'}, function (error, response, body) {

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
        last_response.json(resultsJson)

    })

});

router.get('/comics_list', function (req, last_response, next) {

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


        last_response.json(resultsJson)


    })

});

module.exports = router;
