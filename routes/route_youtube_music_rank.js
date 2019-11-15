var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const cheerio = require('cheerio')
var syncrequest = require('sync-request');
const puppeteer = require('puppeteer');

router.get('/youtube_top100/', function (req, last_response, next) {


    (async () => {
        const browser = await puppeteer.launch({
            headless: true

        });
        const page = await browser.newPage();

        var query= encodeURI('pink what about us album art')
        await page.goto('https://www.youtube.com/playlist?list=PLw-VjHDlEOgvtnnnqWlTqByAtC7tXBg6D');
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {
            $("html, body").animate({ scrollTop: $(document).height() }, 3000);


            await new Promise(function(resolve) {
                setTimeout(resolve, 4000)
            });

            var resultsJson = [];

            $('#contents > ytd-playlist-video-renderer  ').each(function () {

                var title = $(this).find('#meta').children().children().next().text().trim();

                //yt-formatted-string
                var rank = $(this).find('#index').text()
                //thumbnail
                var thumbnail = $(this).find('#img').attr('src');

                //yt-simple-endpoint
                var endpoint = $(this).find('.yt-simple-endpoint').attr('href');

                let arr_end_point= endpoint.split('?v=');

                console.log('##############' , arr_end_point);

                let _id = arr_end_point[1].split('&');

                resultsJson.push({
                    rank: rank,
                    title : title,
                    thumbnail:thumbnail,
                    endpoint:_id[0],
                })

            });

            return resultsJson;


        });

        await browser.close();

        console.log('##############', dimensions);

        last_response.json(dimensions)


    })();
});



router.get('/youtube_top100_v2/', function (req, last_response, next) {


    (async () => {
        const browser = await puppeteer.launch({
            headless: true

        });
        const page = await browser.newPage();

        var query= encodeURI('pink what about us album art')
        await page.goto('https://www.youtube.com/playlist?list=PLw-VjHDlEOgvtnnnqWlTqByAtC7tXBg6D');
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {
            $("html, body").animate({ scrollTop: $(document).height() }, 3000);


            await new Promise(function(resolve) {
                setTimeout(resolve, 4000)
            });

            var resultsJson = [];

            $('#contents > ytd-playlist-video-renderer  ').each(function () {

                var title = $(this).find('#meta').children().children().next().text().trim();

                //yt-formatted-string
                var rank = $(this).find('#index').text()
                //thumbnail
                var thumbnail = $(this).find('#img').attr('src');

                //yt-simple-endpoint
                var endpoint = $(this).find('.yt-simple-endpoint').attr('href');

                let arr_end_point= endpoint.split('?v=');

                console.log('##############' , arr_end_point);

                let _id = arr_end_point[1].split('&');

                resultsJson.push({
                    snippet: {
                        title: title,
                        thumbnails: {
                            medium :thumbnail
                        },
                        rank: rank,
                    },
                    id : {
                        videoId : _id
                    }
                })

            });

            return resultsJson;


        });

        await browser.close();

        console.log('##############', dimensions);

        last_response.json(dimensions)


    })();
});



router.get('/youtube_top100_v2_fast/', function (req, last_response, next) {


    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
            dumpio: true,
        });
        const page = await browser.newPage();

        var query= encodeURI('pink what about us album art')
        await page.goto('https://www.youtube.com/playlist?list=PLw-VjHDlEOgvtnnnqWlTqByAtC7tXBg6D');
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {

            var resultsJson = [];

            $('#contents > ytd-playlist-video-renderer  ').each(function () {

                var title = $(this).find('#meta').children().children().next().text().trim();

                //yt-formatted-string
                var rank = $(this).find('#index').text()
                //thumbnail
                var thumbnail = $(this).find('#img').attr('src');

                //yt-simple-endpoint
                var endpoint = $(this).find('.yt-simple-endpoint').attr('href');

                let arr_end_point= endpoint.split('?v=');

                console.log('##############' , arr_end_point);

                let _id = arr_end_point[1].split('&');

                resultsJson.push({
                    snippet: {
                        title: title,
                        thumbnails: {
                            medium :thumbnail
                        },
                        rank: rank,
                    },
                    id : {
                        videoId : _id[0]
                    }
                })

            });

            return resultsJson;


        });

        await browser.close();
        last_response.json(dimensions)


    })();
});


module.exports = router;
