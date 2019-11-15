
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
    await page.goto('https://youtubemp3api.com/@api/button/mp3/' + 'ivPEKaBHjYA');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {
        /* return {
         width: document.documentElement.clientWidth,
         height: document.documentElement.clientHeight,
         deviceScaleFactor: window.devicePixelRatio
         };*/

        await new Promise(function (resolve) {
            setTimeout(resolve, 3000)
        });

        var resultsJson = [];

        $('.download-result > .download-mp3-url').each(function () {
            var link = $(this).attr('href')

            resultsJson.push({
                "link": link
            })

        });
        return resultsJson;
    });

    await browser.close();


    for ( var i=0;i<dimensions.length; i++){

        let __link = dimensions[i].link;

        dimensions[i].link = 'http:'+ __link;

    }

    console.log('##############', dimensions);

    last_response.json(dimensions)


})();