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


    console.log('##############', dimensions);

    console.log('##############', dimensions.length);


})();