const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox'],
        dumpio: true,
    });
    const page = await browser.newPage();

    /*
     https://youtubemp3api.com/@api/button/mp3/0hG_I8USKIc

     */
    await page.goto('https://mpgun.com/youtube-to-mp3.html?title=sdfsdf&yid=k2qgadSvNyU');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {
        await new Promise(function (resolve) {
            setTimeout(resolve, 500)
        });


        let result = [];

        let link = $(".downloadblock").children().attr('href');


        /*$("#submitForm").trigger("click");

         await page.waitForSelector('a[class="button green-bg icon-right"]');*/

        result.push({
            link: link,
        })

        result.push({
            link: link,
        })

        result.push({
            link: link,
        })

        result.push({
            link: link,
        })


        return result;

    });

//    await browser.close();


    console.log('##############', dimensions);

    last_response.json(dimensions)


})();