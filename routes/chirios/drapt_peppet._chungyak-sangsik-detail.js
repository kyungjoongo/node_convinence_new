const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true

    });
    const page = await browser.newPage();

    let curpage = 2;
    let startPage = (curpage - 1) * 15;

    let url = 'http://www.drapt.com/e_sale/index.htm?page_name=brief_msg_viewN&menu_key=19&uid=1065'

    await page.goto(url);
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {

        var resultsJson = [];

        $('.view_style03  > tbody').each(function () {

            var content = $(this).find(".con").text();


            let baseUrl = 'http://www.drapt.com/e_sale/'


            resultsJson.push({
                content: content,


            })


        });


        return resultsJson;


    });


    console.log('##############', dimensions);

    console.log('##############', dimensions.length);


})();