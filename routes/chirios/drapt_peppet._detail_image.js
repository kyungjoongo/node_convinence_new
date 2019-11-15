const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true

    });
    const page = await browser.newPage();

    let url = 'http://www.drapt.com/sise/html_view5/total_img_frm.php?no=55046&lta_Flag=1'

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


    console.log('##############', dimensions);

    console.log('##############', dimensions.length);


})();