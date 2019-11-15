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
            /*'--disable-gpu',*/
            '--window-size=1920x1080'],
        /*args: [],*/
        dumpio: true,
    });




    const page = await browser.newPage();
    await page.goto('https://youtube7.download/mini.php?id=Mgfe5tIwOj0');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {
        await new Promise(function (resolve) {
            setTimeout(resolve, 1000)
        });


        let resultsJson = [];


        /**/


        $('.chart-wrapper > .feed-item ').each(function () {

            var image = $(this).find('.cover-art').children().next().attr('src')
            resultsJson.push({
                image : image,

            })

        });



        return resultsJson;

    });

    //await browser.close();
    console.log('##############', dimensions);

})();