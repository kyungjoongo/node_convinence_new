const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true

    });
    const page = await browser.newPage();

    let curpage=2;
    let startPage = (curpage-1) * 15;

    let url = 'http://www.drapt.com/e_sale/index.htm?page_name=brief_msgN&menu_key=19&start='+ startPage

    await page.goto(url);
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {

        var resultsJson = [];

        $('.common_table03  > tbody > tr').each(function () {

            var key = $(this).find("td:eq(0)").text();
            var title = $(this).find("td:eq(1)").text();
            var href = $(this).find("td:eq(1)").children().children().attr('href')

            //var __hrefarr = href.split('uid');

            let baseUrl='http://www.drapt.com/e_sale/'


            if ( title !=''){
                resultsJson.push({
                    key: key,
                    title: title,
                    href:  href,

                })
            }




        });



        return resultsJson;


    });

    dimensions.forEach(elementOne => {

        let __href = (elementOne.href).substring('uid=');

        console.log('##############', __href[0]);
        console.log('', __href);

        elementOne.href = __href
    });


    console.log('##############', dimensions);

    console.log('##############', dimensions.length);


})();