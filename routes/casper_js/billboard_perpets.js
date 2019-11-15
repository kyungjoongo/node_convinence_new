var request = require("request");
var cheerio = require("cheerio");
var fetch = require("node-fetch");
const {forEach} = require('p-iteration');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--window-size=1920x1080'],

    });
    const page = await browser.newPage();
    await page.goto('https://www.billboard.com/charts/hot-100');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
    const dimensions = await page.evaluate(async () => {


        //  window.scrollBy(0, document.body.scrollHeight);
        //$('html, body').scrollTop( $(document).height() - $(window).height() );

        $('body').animate({scrollTop: $(document).height() - $(window).height()}, 4000)

        /*  await new Promise((resolve, reject) => {
         let totalHeight = 0
         let distance = 100
         let timer = setInterval(() => {
         let scrollHeight = document.body.scrollHeight
         window.scrollBy(0, distance)
         totalHeight += distance
         if (totalHeight >= scrollHeight) {
         clearInterval(timer)
         resolve()
         }
         }, 100)
         })*/

        var resultsJson = [];


        $('.container > .chart-row ').each(function () {

            var text = $(this).find('.chart-row__song').text();
            var row__image = $(this).find('.chart-row__main-display > .chart-row__image').attr('style')


            resultsJson.push({
                text: text,
                row__image: row__image,

            })


        });


        return resultsJson;


    });

    console.log('##############', dimensions);

    //await browser.close();


})();