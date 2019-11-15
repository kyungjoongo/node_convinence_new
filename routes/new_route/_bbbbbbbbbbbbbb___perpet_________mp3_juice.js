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
    await page.goto('http://kyungjoon.ipdisk.co.kr:4000/?id=VsVNlIV5k7k');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const popup = page[page.length - 1];

    popup.close();

   /* const dimensions = await page.evaluate(async () => {
        await new Promise(function (resolve) {
         setTimeout(resolve, 1000)
         });
        let resultsJson = [];

        $("input[name='url']").val('https://www.youtube.com/watch?v=aJOTlE1K90k')

        $("#loader-button").trigger('click');

        return resultsJson;

    });*/


    await page.waitFor('#container').then(async () => {
        page.evaluate(() => {
            let resultList = [];


            $('a[class="download 1"]')[0].click()


            return resultList;
        }).then(async ()=>{

            let dimensions = await page.waitFor('.url').then(async () => {
                let result=await page.evaluate(async () => {
                    let resultList = [];

                    /*alert($("div[class='file margin']").find('.url').attr('href'));*/
                    await new Promise(function (resolve) {
                        setTimeout(resolve, 3000)
                    });
                    let _rsult = $(".url").attr('href');

                    /*console.log('##############', _rsult);*/

                  //  alert(_rsult);


                    return _rsult;
                }).then((searchResult) => {
                    console.log(searchResult)
                    //browser.close();

                    return searchResult;
                });

                return result;
            })

            browser.close()

            console.log('##############', dimensions);
        })
    })

})();