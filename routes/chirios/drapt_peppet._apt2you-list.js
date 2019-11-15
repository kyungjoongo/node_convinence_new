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

            resultsJson.push({
                title: title,
                itemNo: itemNo,
                date:date,

            })


        });


        return resultsJson;


    });


    console.log('##############', dimensions);

    console.log('##############', dimensions.length);


})();