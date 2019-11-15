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

    const proxyChain = require('proxy-chain');

    //const oldProxyUrl = 'http://bob:password123@35.199.78.142:80';
    let proxys= [
        '47.206.51.67:8080',
     /*   '104.238.146.146:8123',
        '45.55.134.204:3128',
        '65.61.106.131:8080',
        '45.77.95.158:8170',
        '104.152.188.251:80',*/
    ]

    let randNo = randomIntFromInterval(0,proxys.length-1);

    const oldProxyUrl = 'http://bob:password123@'+ proxys[randNo];

    console.log('oldProxyUrl--->', oldProxyUrl);
    const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

    // Prints something like "http://127.0.0.1:45678"
    console.log(newProxyUrl);

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            `--proxy-server=${newProxyUrl}`,
            '--no-sandbox',
            '--disable-gpu',
            '--window-size=1920x1080'],
        /*args: [],*/
        dumpio: true,
    });


    const page = await browser.newPage();
    await page.goto('https://youtube7.download/mini.php?id=Mgfe5tIwOj0');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    await page.waitForSelector('.hrefdownload');

    const dimensions = await page.evaluate(async () => {
        await new Promise(function (resolve) {
            setTimeout(resolve, 1000)
        });
        //.hrefdownload



        let resultsJson = [];


        let href= $(".hrefdownload").attr('href')



        return href;

    });

    //await browser.close();
    console.log('##############', dimensions);

})();