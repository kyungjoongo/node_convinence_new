const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true

    });
    const page = await browser.newPage();

    let curpage = 2;
    let startPage = (curpage - 1) * 15;

    let url = 'http://www.drapt.com/sise/html_view5/total.php?no=43171'

    await page.goto(url);
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {

        var resultsJson = [];

        $('#view_price table >  tbody > tr').each(function () {


            var dimension = $(this).find('td:eq(0)').text();
            var price= $(this).find('td:eq(1)').text();

            if ( dimension !=''){
                resultsJson.push({

                    dimension:dimension,
                    price:price,
                })
            }



        });



        return resultsJson;


    });


    console.log('##############', dimensions);

    console.log('##############', dimensions.length);


})();