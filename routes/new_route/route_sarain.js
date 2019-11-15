var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const cheerio = require('cheerio')
var syncrequest = require('sync-request');
const puppeteer = require('puppeteer');
var beautify = require("json-beautify");
var Iconv1 = require('iconv').Iconv;

router.get('/jobkorea', function (req, last_response, next) {

    var __page;

    if (req.query.page === undefined) {
        __page = 1
    } else {
        __page = req.query.page;
    }

    var location;

    if (req.query.location === undefined) {
        location = 'B150'
    } else {
        location = req.query.location;
    }


    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--window-size=1920x1080'],
            dumpio: true,
        });
        const page = await browser.newPage();

        //분당
        //B150

        //강남구
        //I010

        //서초구
        //I150


      /*  http://m.jobkorea.co.kr/list_gi/gi_area_list.asp?page=&TS_Div
            // =&TS_Cate=&TS_BCode=&TS_Code=&TS_OrderBy=&TS_JoinPossible=&
            // TS_GroupNo=&TS_ThemaNo=&TS_XML=&TS_Search=&TS_SearchArea=&cur_Path=
            // %2Flist_gi%2Fgi_area_list.asp&TS_KeyWord=&TS_KwrdCode=&TS_BAreaCode=&TS_AreaCode=I010&TS_BPartNo=10016&TS_PartNo=1000100&TS_Career=&TS_Last_Edu_Level=&TS_CType=*/

        await page.goto('http://m.jobkorea.co.kr/list_gi/gi_part_list.asp?page='+ __page+ '&TS_AreaCode='+location+ '&TS_BAreaCode=I010' +
            '&TS_PartNo=1000100&SPage=0&SPageSize=&AddList=&HEnd=0');
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {

            let resultArray = []

            /* await new Promise(function (resolve) {
             setTimeout(resolve, 2000)
             });*/


            $('.mBooth    > ul> li ').each(function () {

                var company = $(this).find('strong').text();
                var href = $(this).children().attr('href');
                //txt
                var title = $(this).find('.txt').text();

                //desc
                var desc = $(this).find('.desc').text().replace('\n\t\t\t', '').replace('\n\t\t\t','').replace('\t','')

                //date
                var date = $(this).find('.date').children().text();

                resultArray.push({
                    company: company,
                    title : title,
                    desc:desc,
                    href:'http://m.jobkorea.co.kr/'+ href,
                    date:date,
                })


            });




            return resultArray;

        });
        await browser.close();
        console.log('##############', dimensions);
        console.log('resultArray-->lenght', dimensions.length);

        last_response.json(dimensions)


    })();


});


router.get('/saramin', function (req, last_response, next) {
    var __page;

    if (req.query.page === undefined) {
        __page = 1
    } else {
        __page = req.query.page;
    }

    var location;

    if (req.query.location === undefined) {
        location = '102190'
    } else {
        location = req.query.location;
    }


    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--window-size=1920x1080'],
            dumpio: true,
        });
        const page = await browser.newPage();


        /*http://www.saramin.co.kr/zf_user/jobs/list/job-category?cat_cd=404&loc_cd=102190&search_optional_item=n&sort=RD&recruit_kind=recruit&quick_apply=n*/

        console.log('page' + __page);
        await page.goto('http://www.saramin.co.kr/zf_user/jobs/list/job-category?page='+ __page+ '&cat_cd=404%2C410&loc_cd='+ encodeURI(location) +
            '&search_optional_item=n&isAjaxRequest=0&page_count=50&sort=RD&type=job-category#searchTitle');


        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {

            let resultArray = []

            /* await new Promise(function (resolve) {
             setTimeout(resolve, 2000)
             });*/

            $('.recruiting_list   > tbody> tr ').each(function () {

                var announcement = $(this).find('.str_tit').text();
                var href = $(this).find('.str_tit').attr('href')
                //company_nm
                var company_nm = $(this).find('.company_nm').children().attr('title')
                //recruit_condition
                var recruit_condition = $(this).find('.career').text();
                var recruit_condition2 = $(this).find('.education').text();
                //deadlines
                var deadlines = $(this).find('.deadlines').text();

                //company_info
                var company_info = $(this).find('.employment_type').text();
                var company_info2 = $(this).find('.work_place').text();


                resultArray.push({
                    announcement: announcement,
                    href: 'http://www.saramin.co.kr' + href,
                    company_nm: company_nm,
                    recruit_condition: recruit_condition + "|" + recruit_condition2,
                    deadlines: deadlines,
                    company_info: company_info + "|" + company_info2,
                })


            });


            return resultArray;

        });

        await browser.close();
        console.log('##############', dimensions);
        console.log('resultArray-->lenght', dimensions.length);

        last_response.json(dimensions)


    })();

});


module.exports = router;
