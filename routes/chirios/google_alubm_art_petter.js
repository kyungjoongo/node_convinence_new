var request = require("request");
var cheerio = require("cheerio");
var syncRequest = require('sync-request');


(async () => {
    const browser = await puppeteer.launch(
        {
            headless: true,
            args: ['--no-sandbox'],
            dumpio: true,

        });
    const page = await browser.newPage();

    await page.goto('https://www.google.co.kr/search?q=' + encodeURI(query + ' album art') + '&dcr=0&tbm=isch&source=iu&ictx=1&fir=6VaCUPcyhIsZvM%253A%252CMshOIwMpwui8KM%252C_&usg=__jBNdgISvH-_qdiws6zKBm1Khl54%3D&sa=X&ved=0ahUKEwiIqIGx8tvZAhVBuJQKHUunC-kQ9QEIJzAA#imgrc=6VaCUPcyhIsZvM:');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {


        $('.rg_ic').first()[0].click();

        await new Promise(function (resolve) {
            setTimeout(resolve, 500)
        });

        var link = $('img[class=irc_mi]').attr('src')


        var resultsJson = [];

        resultsJson.push({
            "link": link

        })

        return resultsJson;


    });

    await browser.close();

    console.log('##############', dimensions);

    last_response.json(dimensions)


})();