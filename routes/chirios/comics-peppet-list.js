const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,

    });
    const page = await browser.newPage();

    let curpage = 2;
    let startPage = (curpage - 1) * 15;

    let url = 'https://cointoon.net/comic'

    await page.goto(url);
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {

        var resultsJson = [];

        $('div[class="week_box "]').each(function () {

            var title = $(this).find('h5').children().text();
            var href = $(this).find('h5').children().attr('href')
            var img = $(this).find('img').attr('src')


            resultsJson.push({
                title: title,
                href: href,
                img: img,

            })


        });


        return resultsJson;


    });


    console.log('##############', dimensions);

    console.log('##############', dimensions.length);


})();