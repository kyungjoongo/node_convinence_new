const puppeteer = require('puppeteer');



(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox'],

    });

    var song_query= 'pink trauma'


    const page = await browser.newPage();
    await page.goto('https://www.mp3juices.cc/');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async (song_query) => {

        $('#query').val(song_query);



        await new Promise(function (resolve) {
            setTimeout(resolve, 300)
        });


        $('#button').trigger('click');

        await new Promise(function (resolve) {
            setTimeout(resolve, 700)
        });


        $('.download')[0].click();

        await new Promise(function (resolve) {
            setTimeout(resolve, 1500)
        });


        var resultsJson= $('#download_1').children().next().next().children().attr('href');



        return resultsJson;


    },song_query);

   // await browser.close();

    console.log('##############', dimensions);


})();