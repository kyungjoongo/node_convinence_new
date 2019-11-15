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
    await page.goto('https://savetomp3.com/ko/');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})


    /*await page.waitForSelector('.container');*/

    const dimensions = await page.evaluate(async () => {

        let resultList = [];

        $('.nice_search').val('https://www.youtube.com/watch?v=FRjOSmc01-M')

        $("#submit-b").trigger('click');

        await new Promise(function (resolve) {
            setTimeout(resolve, 1000)
        });

        $('div[data-vid-id="FRjOSmc01-M"]').trigger('click');

    });

    let results = [];

    page.on('response', async response => {
        //console.log('##############',response);

        const status = response.status()
        /* if ((status >= 300) && (status <= 399)) {
         console.log('Redirect from', response.url(), 'to', response.headers()['location'])
         }*/

        if (status == 200) {
            //console.log('22222222222222Redirect from', response.url());

            if (response.url().toString().includes('@download')) {

                console.log('---------- from', response.url());

                results.push({
                    link: response.url()
                })

            }
        }
    })


    setTimeout(() => {

        console.log('##############', results);

    }, 1000 * 10)

})();