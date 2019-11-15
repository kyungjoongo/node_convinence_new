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
    await page.goto('http://localhost:4000/?id=VsVNlIV5k7k');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const __page = await page.evaluate(async () => {
        /*  await new Promise(function (resolve) {
         setTimeout(resolve, 2000)
         });*/
        let resultsJson = [];

        let result = ($("iframe").attr('src'));


        return result;
    });


    console.log('##############', __page);


    await page.goto(__page);
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const __page3 = await page.evaluate(async () => {

        let result = ($("iframe").attr('src'));


        return result;
    });


    await page.goto('http:' + __page3);
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {


        $("#download-audio").trigger('click')

        await new Promise(function (resolve) {
            setTimeout(resolve, 1000)
        });

        let href = $("#file").attr('href');

        return href;
    });


    console.log('##############', dimensions);


})();