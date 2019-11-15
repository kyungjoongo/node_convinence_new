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
    await page.goto('https://genius.com/');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
    const dimensions = await page.evaluate(async () => {

        $("input[name='q']").val('pink trauma');

        //$(".global_search-search_icon")[0].click();

        $(".global_search").submit();

/*
        $("#download-audio").trigger('click')

        await new Promise(function (resolve) {
            setTimeout(resolve, 1000)
        });

        let href = $("#file").attr('href');

        return href;*/
    });


    await page.waitForSelector('.column_layout-column_span');

    const dimensions22 = await page.evaluate(async () => {

      // alert('sdlfksdlfkdslkf')

        let href= $(".mini_card").attr('href')

        //mini_card-thumbnail

        //let href= $(".mini_card-info").parent().attr('href')

        //let href= $(".mini_card").attr('href');

        console.log('##############', href);
    });



})();