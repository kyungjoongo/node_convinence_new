
const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'],
        dumpio: true,
    });
    const page = await browser.newPage();

    /*
     https://youtubemp3api.com/@api/button/mp3/0hG_I8USKIc
     */
    await page.goto('https://youtubemp3api.com/@api/button/mp3/' + '0hG_I8USKIc');
    await page.addScriptTag({url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js'})
    //await page.addScriptTag({path: 'public/jquery3.js'});

    await page.waitForSelector('.download-mp3-url');

    const dimensions = await page.evaluate(async () => {


        /*
        await new Promise(function (resolve) {
            setTimeout(resolve, 1500)
        });*/

        var resultsJson = [];

        $('.download-result > .download-mp3-url').each(function () {
            var link = $(this).attr('href')

            resultsJson.push({
                "link": link
            })

        });
        return resultsJson;
    });

    //await browser.close();


    for ( var i=0;i<dimensions.length; i++){

        let __link = dimensions[i].link;

        dimensions[i].link = 'http:'+ __link;

    }

    console.log('##############', dimensions);
    last_response.json(dimensions)


})();