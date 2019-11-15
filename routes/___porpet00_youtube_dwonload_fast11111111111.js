const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'],
        dumpio: true,
    });
    const page = await browser.newPage();
    await page.goto('https://youtube2mp3api.com/@api/button/mp3/xuAH21DkJow');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {

        let resultArray=[]

        await new Promise(function (resolve) {
            setTimeout(resolve, 2000)
        });


        let url= $('.download-result > #download_link').children().attr('href')

        let fullUrl= "http:"+ url;

        resultArray.push({
            'link' : fullUrl
        })
        resultArray.push({
            'link' : fullUrl
        })
        resultArray.push({
            'link' : fullUrl
        })
        resultArray.push({
            'link' : fullUrl
        })

        return resultArray;

    });

    /*await browser.close();*/

    console.log('##############', dimensions);


})();