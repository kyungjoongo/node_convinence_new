const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true

    });
    const page = await browser.newPage();

    let curpage = 2;
    let startPage = (curpage - 1) * 15;

    let url = 'http://www.drapt.com/sise/html_view5/total_img_frm.php?lta_Flag=1&no=43171'

    await page.goto(url);
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {

        var resultsJson = [];

        $('.one_pic').each(function () {

            var key = $(this).find('img').attr('src')
            var value = $(this).find('td').text();

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