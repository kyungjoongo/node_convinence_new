const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox'],
        dumpio: true,
    });
    const page = await browser.newPage();
    await page.goto('http://www.recordmp3.co/#/watch?v=0hG_I8USKIc');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {


       /* var resultsJson = [];

        $('#input').val('https://www.youtube.com/watch?v=gslVDBS0VeI')

        $('#submit').trigger('click');


        await new Promise(function(resolve) {
            setTimeout(resolve, 2000)
        });



        var link = $('#download').attr('href');

        resultsJson.push({
            "link": link

        })

        return resultsJson;*/


    });

    /*await browser.close();*/

    console.log('##############', dimensions);


})();