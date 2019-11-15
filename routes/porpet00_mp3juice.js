const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false


    });
    const page = await browser.newPage();
    await page.goto('https://www.mp3juices.cc/');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    let query='goo goo dols slide'

    const dimensions = await page.evaluate(async (query) => {

        await new Promise(function (resolve) {
            setTimeout(resolve, 1000)
        });

        $('#query').val(query);


        await new Promise(function (resolve) {
            setTimeout(resolve, 300)
        });


        $('#button').trigger('click');

        await new Promise(function (resolve) {
            setTimeout(resolve, 700)
        });


        $('.download')[0].click();

        await new Promise(function (resolve) {
            setTimeout(resolve, 2000)
        });


        var resultsJson= $('#download_1').children().next().next().children().attr('href');


        return resultsJson;

    }, query);


    /*await browser.close();*/

    console.log('##############', dimensions);


})();