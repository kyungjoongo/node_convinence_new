
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
    await page.goto('https://ytbapi.com/dl.php?link=https://www.youtube.com/watch?v=pjTj-_55WZ8&format=mp3&text=fff&color=009688');
    await page.addScriptTag({url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js'})
    //await page.addScriptTag({path: 'public/jquery3.js'});

    const dimensions = await page.evaluate(async () => {

        var resultsJson = [];
/*
        await new Promise(function (resolve) {
            setTimeout(resolve, 1000)
        });*/

        $("#download-audio").trigger('click');


        await new Promise(function (resolve) {
            setTimeout(resolve, 1000)
        });



        let url = $("#container").children().attr('href');

        resultsJson.push({
            "link": url,
        })
        resultsJson.push({
            "link": url,
        })
        resultsJson.push({
            "link": url,
        })
        resultsJson.push({
            "link": url,
        })

        return resultsJson;
    });

    //await browser.close();
    console.log('##############', dimensions);


})();