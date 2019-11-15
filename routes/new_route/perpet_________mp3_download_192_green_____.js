var striptags = require('striptags');
var prettyjson = require('prettyjson');
var fs = require('fs');
var youtubedl = require('youtube-dl');
var ffmpeg = require('fluent-ffmpeg');
var btc = require('better-try-catch')
const puppeteer = require('puppeteer');
var syncRequest = require('sync-request');


(async () => {

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const proxyChain = require('proxy-chain');

    //const oldProxyUrl = 'http://bob:password123@35.199.78.142:80';
    let proxys = [
        '121.164.89.97:808',
    ]

    let randNo = randomIntFromInterval(0, proxys.length - 1);

    const oldProxyUrl = 'http://' + proxys[randNo];
    console.log('oldProxyUrl--->', oldProxyUrl);

    const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

    // Prints something like "http://127.0.0.1:45678"
    console.log('newProxyUrl--->',newProxyUrl);

    const browser = await puppeteer.launch({
        headless: false,
        args: [
            `--proxy-server=${newProxyUrl}`,
            '--no-sandbox',
            ],
        dumpio: true,
        ignoreHTTPSErrors: true
    });



/////////////////////////////////////////////////////////////////////////
    const page = await browser.newPage();
    await page.goto('https://www.convertmp3.io/widget/button/?video=https://www.youtube.com/watch?color=397818&v=8MPbR6Cbwi4',{
    });
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {
        await new Promise(function (resolve) {
            setTimeout(resolve, 1000)
        });


        let resultsJson = [];


        let href= $("#downloadButton").attr('href')


        href= "https://www.convertmp3.io" + href;

        return href;

    });

    //await browser.close();
    console.log('##############', dimensions);

})();