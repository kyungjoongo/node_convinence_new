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
    await page.goto('https://itunes.apple.com/kr/album/whatever-it-takes/id1348856206?i=1348856987&app=music&ign-itsct=Shazam_1&ign-itscg=30201&ign-mpt=uo%3D5');
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

    //await browser.close();
    console.log('##############', dimensions);

})();