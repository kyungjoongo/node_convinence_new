const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'],
        dumpio: true,
    });
    const page = await browser.newPage();
    await page.goto('https://ytmp3.cc/');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {


        var resultsJson = [];

        $('#input').val('https://www.youtube.com/watch?v=gslVDBS0VeI')

        $('#submit').trigger('click');


        await new Promise(function(resolve) {
            setTimeout(resolve, 2000)
        });



        var link = $('#download').attr('href');

        resultsJson.push({
            "link": link

        })

        return resultsJson;


    });

    /*await browser.close();*/

    console.log('##############', dimensions);


})();