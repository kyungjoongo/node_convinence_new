const puppeteer = require('puppeteer');

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

            resultsJson.push({
                id: id,
                locaotion: locaotion,
                title:title ,
                href : href,

            })


        });


        return resultsJson;


    });


    console.log('##############', dimensions);

    console.log('##############', dimensions.length);


})();