var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const cheerio = require('cheerio')
var syncrequest = require('sync-request');
const puppeteer = require('puppeteer');


router.get('/dr_apt_bunyang_list_v2/', function (req, last_response, next) {

    const puppeteer = require('puppeteer');
    var urlencode = require('urlencode');
    let si = req.query.si;
    let goo = req.query.goo;

    //console.log('######goo########'+ goo)

    /*0,30,60*/
    let page =req.query.page;

    let pageStart = (page-1) * 30;


    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
            dumpio: true,
        });
        const page = await browser.newPage();

        /*        let si ='충청북도';*/
        let encodeValue= '';

        if ( si === '서울특별시'){
            encodeValue = '%BC%AD%BF%EF%C6%AF%BA%B0%BD%C3'
        }

        if ( si === '경기도'){
            encodeValue = '%B0%E6%B1%E2%B5%B5'
        }

        if ( si === '신도시'){
            encodeValue = '%BD%C5%B5%B5%BD%C3'
        }

        if ( si === '인천광역시'){
            encodeValue = '%C0%CE%C3%B5%B1%A4%BF%AA%BD%C3'
        }


        if ( si === '부산광역시'){
            encodeValue = '%BA%CE%BB%EA%B1%A4%BF%AA%BD%C3'
        }

        if ( si === '대구광역시'){

            encodeValue = '%B4%EB%B1%B8%B1%A4%BF%AA%BD%C3'
        }

        if ( si === '광주광역시'){
            encodeValue = '%B1%A4%C1%D6%B1%A4%BF%AA%BD%C3'
        }

        if ( si === '대전광역시'){

            encodeValue = '%B4%EB%C0%FC%B1%A4%BF%AA%BD%C3'
        }


        if ( si === '울산광역시'){
            encodeValue = '%BF%EF%BB%EA%B1%A4%BF%AA%BD%C3'
        }

        if ( si === '강원도'){
            encodeValue = '%B0%AD%BF%F8%B5%B5'
        }

        if ( si === '경상남도'){
            encodeValue = '%B0%E6%BB%F3%B3%B2%B5%B5'
        }
        if ( si === '전라남도'){
            encodeValue = '%C0%FC%B6%F3%B3%B2%B5%B5'
        }

        if ( si === '전라북도'){
            encodeValue = '%C0%FC%B6%F3%BA%CF%B5%B5'
        }

        if ( si === '세종특별자치시'){
            encodeValue = '%BC%BC%C1%BE%C6%AF%BA%B0%C0%DA%C4%A1%BD%C3'
        }

        if ( si === '충청남도'){
            encodeValue = '%BC%BC%C1%BE%C6%AF%BA%B0%C0%DA%C4%A1%BD%C3'
        }

        if ( si === '충청북도'){
            encodeValue = '%C3%E6%C3%BB%BA%CF%B5%B5'
        }

        if ( si === '제주도'){
            encodeValue = '%C1%A6%C1%D6%B5%B5'
        }



        let url = 'http://www.drapt.com/e_sale/index.htm?page_name=saleinfo&menu_key=8&si='+encodeValue +
            '&gu='+ goo+ '&dong=&sear_date=&sigong=&gubun=&viewline=30&start='+ pageStart

        await page.goto(url);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {

            var resultsJson = [];


            $('.siselist_2010 > tbody > tr').each(function () {

                var txt_name = $(this).find('.link_busi').text();
                //txt_loca
                var txt_loca = $(this).find('.txt_loca').text();
                //href
                var href = ($(this).find('.link_busi').attr('href'))
                //txt_date
                var txt_date = $(this).find('.txt_date').text();
                //txt_kind
                var txt_kind = $(this).find('.txt_kind').text();
                //txt_builder
                var txt_builder = $(this).find('.txt_builder').text();

                if ( txt_name != ''){
                    resultsJson.push({
                        txt_name: txt_name,
                        txt_loca:txt_loca,
                        href:href,
                        txt_date:txt_date,
                        txt_kind:txt_kind,
                        txt_builder:txt_builder,


                    })
                }




            });

            return resultsJson;


        });


        dimensions.forEach(elementOne => {

            let __href = (elementOne.href).replace('javascript:saleDetailInfo(\'', '').replace('\');', '')
            console.log('', __href);

            elementOne.href = __href
        });

        await browser.close();

        last_response.json(dimensions)

    })();

});



router.get('/drbunyang_detail_image/', function (req, last_response, next) {

    let item_no = req.query.item_no;


    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
            dumpio: true,
        });
        const page = await browser.newPage();

        let url = 'http://www.drapt.com/sise/html_view5/total_img_frm.php?no='+ item_no + '&lta_Flag=1'

        await page.goto(url);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {

            var resultsJson = [];

            $('#mp20051021215630item0 > #one_pic_block > dl').each(function () {

                var key = $(this).find('img').attr('src')

                resultsJson.push({
                    key: key,

                })


            });



            return resultsJson;


        });

        await browser.close();

        last_response.json(dimensions)

    })();
});


router.get('/drapt_bunyang_detail/', function (req, last_response, next) {

    let item_no = req.query.item_no;

    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
            dumpio: true,
        });
        const page = await browser.newPage();

        let url = 'http://www.drapt.com/sise/html_view5/total.php?no='+ item_no

        await page.goto(url);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {

            var resultsJson = [];
            var index = 1;
            $('.one_table01 > tbody > tr').each(function () {

                var key = $(this).find('th').text().replace('\n', '').trim();
                var value = $(this).children().next().text()

                if (index === 3) {
                    key = key.replace('공급면적전용면적일반분양가구수임대가구수장기전세주택가구수', '').trim();
                    value = value.replace('공급면적', '')
                        .replace('전용면적', '')
                        .replace('일반분양가구수', '')
                        .replace('임대가구수', '')
                        .replace('장기전세주택가구수', '')
                        .replace('-\n', '')
                        .replace('\\n', '')
                }

                resultsJson.push({
                    key: key,
                    value: value,

                })

                index++;

            });



            return resultsJson;


        });

        await browser.close();


        last_response.json(dimensions)


    })();

});




router.get('/bunyang_detail_screenshot/', function (req, last_response, next) {

    (async () => {

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
            dumpio: true,
        });
        const page = await browser.newPage();

        page.setViewport({width: 1000, height: 600, deviceScaleFactor: 2});

        await page.goto('http://www.drapt.com/sise/html_view5/total.php?no=55046', {waitUntil: 'networkidle2'});

        let path= 'E:\\node_express\\node-express-convience-rest\\public\\images\\element.png';

        async function screenshotDOMElement(selector, padding = 0) {
            const rect = await page.evaluate(selector => {
                const element = document.querySelector(selector);
                const {x, y, width, height} = element.getBoundingClientRect();
                return {left: x, top: y, width, height, id: element.id};
            }, selector);

            return await page.screenshot({
                path: 'E:\\node_express\\node-express-convience-rest\\public\\images\\element.png',
                clip: {
                    x: rect.left - padding,
                    y: rect.top - padding,
                    width: rect.width + padding * 2,
                    height: rect.height + padding * 2
                }
            });
        }

        await screenshotDOMElement('.body_hd', 16).then(()=>{
            console.log('##########success');
        });

        await browser.close();


        last_response.json({path: path})

    })();

});


router.get('/dr_apt_bunyang_list/', function (req, last_response, next) {

    const puppeteer = require('puppeteer');
    var urlencode = require('urlencode');

    let si = req.query.si;

    /*0,30,60*/
    let page =req.query.page;

    let pageStart = (page-1) * 30;


    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
            dumpio: true,
        });
        const page = await browser.newPage();

/*        let si ='충청북도';*/
        let encodeValue= '';

        if ( si === '서울특별시'){
            encodeValue = '%BC%AD%BF%EF%C6%AF%BA%B0%BD%C3'
        }

        if ( si === '경기도'){
            encodeValue = '%B0%E6%B1%E2%B5%B5'
        }

        if ( si === '신도시'){
            encodeValue = '%BD%C5%B5%B5%BD%C3'
        }

        if ( si === '인천광역시'){
            encodeValue = '%C0%CE%C3%B5%B1%A4%BF%AA%BD%C3'
        }


        if ( si === '부산광역시'){
            encodeValue = '%BA%CE%BB%EA%B1%A4%BF%AA%BD%C3'
        }

        if ( si === '대구광역시'){

            encodeValue = '%B4%EB%B1%B8%B1%A4%BF%AA%BD%C3'
        }

        if ( si === '광주광역시'){
            encodeValue = '%B1%A4%C1%D6%B1%A4%BF%AA%BD%C3'
        }

        if ( si === '대전광역시'){

            encodeValue = '%B4%EB%C0%FC%B1%A4%BF%AA%BD%C3'
        }


        if ( si === '울산광역시'){
            encodeValue = '%BF%EF%BB%EA%B1%A4%BF%AA%BD%C3'
        }

        if ( si === '강원도'){
            encodeValue = '%B0%AD%BF%F8%B5%B5'
        }

        if ( si === '경상남도'){
            encodeValue = '%B0%E6%BB%F3%B3%B2%B5%B5'
        }
        if ( si === '전라남도'){
            encodeValue = '%C0%FC%B6%F3%B3%B2%B5%B5'
        }

        if ( si === '전라북도'){
            encodeValue = '%C0%FC%B6%F3%BA%CF%B5%B5'
        }

        if ( si === '세종특별자치시'){
            encodeValue = '%BC%BC%C1%BE%C6%AF%BA%B0%C0%DA%C4%A1%BD%C3'
        }

        if ( si === '충청남도'){
            encodeValue = '%BC%BC%C1%BE%C6%AF%BA%B0%C0%DA%C4%A1%BD%C3'
        }

        if ( si === '충청북도'){
            encodeValue = '%C3%E6%C3%BB%BA%CF%B5%B5'
        }

        if ( si === '제주도'){
            encodeValue = '%C1%A6%C1%D6%B5%B5'
        }



        let url = 'http://www.drapt.com/e_sale/index.htm?page_name=saleinfo&menu_key=8&si='+encodeValue +
            '&gu=&dong=&sear_date=&sigong=&gubun=&viewline=30&start='+ pageStart

        await page.goto(url);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {

            var resultsJson = [];


            $('.siselist_2010 > tbody > tr').each(function () {

                var txt_name = $(this).find('.link_busi').text();
                //txt_loca
                var txt_loca = $(this).find('.txt_loca').text();
                //href
                var href = ($(this).find('.link_busi').attr('href'))
                //txt_date
                var txt_date = $(this).find('.txt_date').text();
                //txt_kind
                var txt_kind = $(this).find('.txt_kind').text();
                //txt_builder
                var txt_builder = $(this).find('.txt_builder').text();

                if ( txt_name != ''){
                    resultsJson.push({
                        txt_name: txt_name,
                        txt_loca:txt_loca,
                        href:href,
                        txt_date:txt_date,
                        txt_kind:txt_kind,
                        txt_builder:txt_builder,


                    })
                }




            });

            return resultsJson;


        });


        dimensions.forEach(elementOne => {

            let __href = (elementOne.href).replace('javascript:saleDetailInfo(\'', '').replace('\');', '')
            console.log('', __href);

            elementOne.href = __href
        });

        await browser.close();

        last_response.json(dimensions)

    })();

});


module.exports = router;