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
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-gpu',
        ],
        /*args: [],*/
        dumpio: true,
    });


    const page = await browser.newPage();
    await page.goto('https://www.yt-download.org/@api/button/mp3/FRjOSmc01-M');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})


    await page.waitForSelector('.container');

    const dimensions = await page.evaluate(async () => {

        let resultList = [];

        /*  $('.download-result> link').each(function async() {

         var href = $(this).children().attr('href')

         ;*/

        let href = $(".link:nth-child(3)").children().attr('href')

        resultList.push({
            href: 'http:'+ href
        })

        resultList.push({
            href: 'http:'+ href
        })

        resultList.push({
            href: 'http:'+ href
        })

        resultList.push({
            href: 'http:'+ href
        })


        //alert(href);

        return resultList;

    });

    console.log('##############', dimensions);

})();