var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const cheerio = require('cheerio')
var syncrequest = require('sync-request');
const puppeteer = require('puppeteer');


router.get('/chungyak_route_detail_v2/', function (req, last_response, next) {

    let uid= req.query.uid;

    let image_path = '';
    (async () => {

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
            dumpio: true,
        });
        const page = await browser.newPage();

        page.setViewport({width: 1000, height: 600, deviceScaleFactor: 2});

        await page.goto('http://www.drapt.com/e_sale/index.htm?page_name=brief_msg_viewN&menu_key=19&uid='+ uid+ '&view_count=15&start=0&field=&mode=&s_que=', {waitUntil: 'networkidle2'});


        image_path= '/images/image'+ uid + '.png';

        async function screenshotDOMElement(selector, padding = 0) {
            const rect = await page.evaluate(selector => {
                const element = document.querySelector(selector);
                const {x, y, width, height} = element.getBoundingClientRect();
                return {left: x, top: y, width, height, id: element.id};
            }, selector);

            return await page.screenshot({
                path: 'E:\\node_express\\node-express-convience-rest\\public\\images\\image'+ uid + '.png',
                clip: {
                    x: rect.left - padding,
                    y: rect.top - padding,
                    width: rect.width + padding * 2,
                    height: rect.height + padding * 2
                }
            });
        }

        await screenshotDOMElement('.con', 0).then(()=>{
            console.log('##image make success');
        });

        await browser.close();

        last_response.json(image_path)
    })();

});


router.get('/chungyak_route_detail/', function (req, last_response, next) {

    let uid= req.query.uid;

    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
            dumpio: true,
        });
        const page = await browser.newPage();

        let curpage = 2;
        let startPage = (curpage - 1) * 15;

        let url = 'http://www.drapt.com/e_sale/index.htm?page_name=brief_msg_viewN&menu_key=19&uid='+ uid;

        await page.goto(url);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const crawlingResult = await page.evaluate(async () => {

            var resultsJson = [];
            var content
            $('.view_style03  > tbody').each(function () {

                content = $(this).find(".con").text();




            });


            return content;


        });


        await browser.close();

        last_response.json(crawlingResult)


    })();

});


router.get('/chungyak_route_list/', function (req, last_response, next) {


    let curpage = req.query.curpage;

    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
            dumpio: true,
        });
        const page = await browser.newPage();

        let startPage = (curpage-1) * 15;

        let url = 'http://www.drapt.com/e_sale/index.htm?page_name=brief_msgN&menu_key=19&start='+ startPage

        await page.goto(url);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const crawlingResult = await page.evaluate(async () => {

            var resultsJson = [];

            $('.common_table03  > tbody > tr').each(function () {

                var key = $(this).find("td:eq(0)").text();
                var title = $(this).find("td:eq(1)").text();
                var href = $(this).find("td:eq(1)").children().children().attr('href')

                //var __hrefarr = href.split('uid');

                let baseUrl='http://www.drapt.com/e_sale/'

                if ( title !=''){
                    resultsJson.push({
                        key: key,
                        title: title,
                        href: baseUrl+ href,

                    })
                }




            });

            return resultsJson;

        });

        await browser.close();

        last_response.json(crawlingResult)


    })();
});


module.exports = router;