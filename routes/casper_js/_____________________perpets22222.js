var request = require("request");
var cheerio = require("cheerio");
var fetch = require("node-fetch");
const {forEach} = require('p-iteration');
const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--window-size=1920x1080'],

    });
    const page = await browser.newPage();
    let url = 'https://www.apple.com/itunes/charts/songs/';

    await page.goto(url);
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
    const dimensions = await page.evaluate(async () => {

        var resultsJson = [];


        $('.section-content  > ul  > li ').each(function () {

            var rank = $(this).find('strong').text();
            var img = $(this).find('img').attr('src')
            var title = $(this).find('img').attr('alt')
            var singer = $(this).find('h4').children().text();


            resultsJson.push({
                rank: rank,
                img:'http://www.apple.com'+ img,
                title: title,
                singer:singer,



            })


        });


        return resultsJson;


    });

    //await browser.close();

   console.log('##############', dimensions);


})();
