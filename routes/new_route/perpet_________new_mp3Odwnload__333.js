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
    await page.goto('https://youtube2mp3api.com/@api/button/mp3/EedPfUeBf2A');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})


    await page.waitForSelector('div[id=download_link]');


    const dimensions = await page.evaluate(async () => {

        //alert('sdlkfsdlkf')

        let result= $(".download-result").children().html();

        return result;

    });

    let __result= dimensions.split('href=');


    /*console.log('##############'+ __result[0]);
    console.log('##############'+ __result[1]);
    console.log('##############'+ __result[2]);*/

    let ____result = __result[1].split("download=")

    console.log('##############'+ ____result[0].replace('"', '').replace('"', ''));



    let finalResult = ____result[0].replace('"', '').replace('"', '');

    finalResult= "http:"+ finalResult;

    console.log('finalResult-->'+ finalResult);

    let tempArray =[];

    tempArray.push({
        link : finalResult
    })
    tempArray.push({
        link : finalResult
    })
    tempArray.push({
        link : finalResult
    })
    tempArray.push({
        link : finalResult
    })


    console.log('##############'+ tempArray);


})();