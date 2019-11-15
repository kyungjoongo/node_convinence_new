var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const cheerio = require('cheerio')
var syncrequest = require('sync-request');

const puppeteer = require('puppeteer');


router.get('/apple_json/', function (req, last_response, next) {


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
        await page.goto('https://itunes.apple.com/kr/album/whatever-it-takes/id1278415649');
        //await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

//    await page.waitForSelector('.hrefdownload');

        const dimensions = await page.evaluate(async () => {
            /*await new Promise(function (resolve) {
             setTimeout(resolve, 1000)
             });*/


            let resultsJson = [];



            //let data= $('#shoebox-ember-data-store').innerText;

            let data=document.getElementById("shoebox-ember-data-store").innerText;



            return data;

        });

        await browser.close();
        console.log('##############', dimensions);
        last_response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        last_response.write(dimensions, "utf-8");
        last_response.end()

    })();
});


router.get('/youtube_top100_recent/', function (req, last_response, next) {

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
        await page.goto('https://www.youtube.com/playlist?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG');
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

//    await page.waitForSelector('.hrefdownload');

        const dimensions = await page.evaluate(async () => {
            /*await new Promise(function (resolve) {
             setTimeout(resolve, 1000)
             });*/



            let resultsJson = [];

            await new Promise((resolve, reject) => {
                try {
                    const maxScroll = Number.MAX_SAFE_INTEGER;
                    let lastScroll = 0;
                    const interval = setInterval(() => {
                        window.scrollBy(0, 100);
                        const scrollTop = document.documentElement.scrollTop;
                        if (scrollTop === maxScroll || scrollTop === lastScroll) {
                            clearInterval(interval);
                            resolve();
                        } else {
                            lastScroll = scrollTop;
                        }
                    }, 10);
                } catch (err) {
                    console.log(err);
                    reject(err.toString());
                }
            });

            $('#contents> ytd-playlist-video-renderer').each(function () {




                var href = $(this).html();
                var img = $(this).find('#img').attr('src');
                //yt-simple-endpoint
                var singer = $(this).find('a[class="yt-simple-endpoint style-scope yt-formatted-string"]').text();
                //video-title
                var title = $(this).find('#video-title').text();
                var endpoint = $(this).find('.yt-simple-endpoint').attr('href');
                let arr_end_point= endpoint.split('?v=');

                console.log('##############' , arr_end_point);

                let _id = arr_end_point[1].split('&');
                //index
                var index =$(this).find('#index').text();


                resultsJson.push({
                    image : img,
                    song_name:title,
                    singer: singer,
                    index:index,
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

module.exports = router;
