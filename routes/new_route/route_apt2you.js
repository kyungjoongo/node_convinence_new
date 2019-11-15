var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const cheerio = require('cheerio')
var syncrequest = require('sync-request');
const puppeteer = require('puppeteer');


router.get('/apt2you_list/', function (req, last_response, next) {

    const puppeteer = require('puppeteer');

    (async () => {
        const browser = await puppeteer.launch({
            headless: true

        });
        const page = await browser.newPage();

        let curpage = 2;
        let startPage = (curpage - 1) * 15;

        let url = 'https://m.apt2you.com/viewAptSaleHouseList.action'

        await page.goto(url);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {

            var resultsJson = [];

            $('.type01_top  > tbody > tr').each(function () {

                var title = $(this).find('.link_text').text();
                var itemNo = ($(this).find('.link_text').attr('onclick'))
                var date = $(this).find("td:eq(1)").text();

                if (title !=''){

                    resultsJson.push({
                        title: title,
                        itemNo: itemNo,
                        date:date,

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