const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true

    });
    const page = await browser.newPage();

    var query = encodeURI('pink what about us album art')
    //await page.goto('https://www.youtube.com/playlist?list=PLx0sYbCqOb8QTF1DCJVfQrtWknZFzuoAE');


    //https://www.youtube.com/playlist?list=PLw-VjHDlEOgvtnnnqWlTqByAtC7tXBg6D
    await page.goto('http://www.officialcharts.com/charts/singles-chart/');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {

        var resultsJson = [];

        //window.scrollBy(0, 10000);
/*

        $("html, body").animate({ scrollTop: $(document).height() }, 500);


        await new Promise(function(resolve) {
            setTimeout(resolve, 1500)
        });
*/



        var i = 1;
        $('.chart > .chart-positions > tbody > tr').each(function () {


            if ( i%5 ==2){
                var text = $(this).find('.position').text();
                var thmbnails = $(this).find('.cover').children().attr('src');



                resultsJson.push({
                    thmbnails: thmbnails,

                })
            }


            i++;

        });

        return resultsJson;


    });

    /*await browser.close();*/

    console.log('##############', dimensions);

    console.log('##############', dimensions.length);


})();