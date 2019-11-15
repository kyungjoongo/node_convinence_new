const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false

    });
    const page = await browser.newPage();

    await page.goto('http://corners.auction.co.kr/AllKill/AllDay.aspx');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {

        var resultsJson = [];


        $('.allkill-body> .item_list_wrap > #ItemList > li ').each(function () {

            var text = $(this).find('span[class=title]').text()
            var image = $(this).find('.thumb').attr('src')


            resultsJson.push({
                text: text,
                image: image,


            })


        });

        return resultsJson;


    });

    console.log('##############', dimensions);

    console.log('##############', dimensions.length);


})();