var striptags = require('striptags');
var prettyjson = require('prettyjson');
var fs = require('fs');
var youtubedl = require('youtube-dl');
var ffmpeg = require('fluent-ffmpeg');
var btc = require('better-try-catch')
const puppeteer = require('puppeteer');
var syncRequest = require('sync-request');
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

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

            //index
            var index =$(this).find('#index').text();


            resultsJson.push({
                img : img,
                title:title,
                singer: singer,
                index:index,
            })

        });


        return resultsJson;

    });

    //await browser.close();
    console.log('##############', dimensions);

})();