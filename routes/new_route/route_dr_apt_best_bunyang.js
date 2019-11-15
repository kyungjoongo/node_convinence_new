var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const cheerio = require('cheerio')
var syncrequest = require('sync-request');
const puppeteer = require('puppeteer');

router.get('/dr_best_boonyang_detail_image/', function (req, last_response, next) {
    const puppeteer = require('puppeteer');

    (async () => {
        const browser = await puppeteer.launch({
            headless: true

        });
        const page = await browser.newPage();

        let curpage = 2;
        let startPage = (curpage - 1) * 15;

        let url = 'http://www.drapt.com/sise/html_view5/total_img_frm.php?lta_Flag=1&no=54209'

        await page.goto(url);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {

            var resultsJson = [];

            $('.one_pic').each(function () {

                var image = $(this).find('img').attr('src')

                resultsJson.push({
                    image : image,
                })

            });



            return resultsJson;


        });


        await browser.close();

        last_response.json(dimensions)


    })();

});

router.get('/dr_best_boonyang_detail_v2/', function (req, last_response, next) {
    const puppeteer = require('puppeteer');

    (async () => {
        const browser = await puppeteer.launch({
            headless: true

        });
        const page = await browser.newPage();

        let curpage = 2;
        let startPage = (curpage - 1) * 15;

        let url = 'http://www.drapt.com/sise/html_view5/total.php?no=43171'

        await page.goto(url);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {

            var resultsJson = [];

            $('table[class="one_table01 mt06 mb20"] > tbody > tr').each(function () {

                var key = $(this).find('th').text();
                var value = $(this).find('td').text();

                if (key =='분양일자분양문의'){
                    key='분양질자 / 분양문의'
                    value= value.replace('일', '일 / ')
                }

                resultsJson.push({
                    key : key,
                    value:value,
                })

            });



            return resultsJson;


        });


        await browser.close();

        last_response.json(dimensions)


    })();

});


router.get('/dr_best_boonyang_detail/', function (req, last_response, next) {


    const puppeteer = require('puppeteer');

    (async () => {
        const browser = await puppeteer.launch({
            headless: true

        });
        const page = await browser.newPage();

        let curpage = 2;
        let startPage = (curpage - 1) * 15;

        let url = 'http://www.drapt.com/sise/html_view5/total.php?no=43171'

        await page.goto(url);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {

            var resultsJson = [];

            $('#detail_view> .one_table01   > tbody > tr').each(function () {

                var key = $(this).find('th').text();
                var value = $(this).find('td').text();

                resultsJson.push({
                    key : key,
                    value:value,
                })

            });



            return resultsJson;


        });


        await browser.close();

        last_response.json(dimensions)


    })();
});


router.get('/dr_best_boonyang_list/', function (req, last_response, next) {

    (async () => {
        const browser = await puppeteer.launch({
            headless: true

        });
        const page = await browser.newPage();

        let curpage = 2;
        let startPage = (curpage - 1) * 15;

        let url = 'http://www.drapt.com/bun_maemul/index.htm?page_name=best_cnt&menu_key=11'

        await page.goto(url);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {

            var resultsJson = [];

            $('.common_table03  > tbody > tr').each(function () {


                var id = $(this).find("td:eq(0)").text();
                var locaotion = $(this).find("td:eq(2)").text();
                var title = $(this).find("td:eq(3)").text();
                var href = $(this).find("td:eq(3)").children().children().attr('href')

                if ( title !=''){

                    resultsJson.push({
                        id: id,
                        locaotion: locaotion,
                        title: title,
                        href: href,

                    })
                }



            });


            return resultsJson;


        });


        await browser.close();

        last_response.json(dimensions)


    })();
});

module.exports = router;