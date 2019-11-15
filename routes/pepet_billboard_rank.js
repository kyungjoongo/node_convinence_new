const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true

    });
    const page = await browser.newPage();

    var query = encodeURI('pink what about us album art')
    //await page.goto('https://www.youtube.com/playlist?list=PLx0sYbCqOb8QTF1DCJVfQrtWknZFzuoAE');


    //https://www.youtube.com/playlist?list=PLw-VjHDlEOgvtnnnqWlTqByAtC7tXBg6D
    await page.goto('https://www.billboard.com/charts/r-b-hip-hop-songs');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {

        var resultsJson = [];

        //window.scrollBy(0, 10000);

        $("html, body").animate({ scrollTop: $(document).height() }, 500);


        await new Promise(function(resolve) {
            setTimeout(resolve, 1500)
        });



        var i = 1;
        $('.chart-row  ').each(function () {

            var rank = $(this).find('.chart-row__current-week').text();
            var thumbnail = $(this).find('.chart-row__image').attr('style')

            var song= $(this).find('.chart-row__song').text();
            //chart-row__artist
            var artist = $(this).find('.chart-row__artist').text();




            resultsJson.push({
                rank: rank,
                thumbnail: thumbnail,
                artist: artist,
                song: song,


            })

            i++;

        });

        return resultsJson;


    });

    /*await browser.close();*/

    for ( var i=0 ; i<dimensions.length;i++){

        let thumbnail= dimensions[i].thumbnail

        if ( thumbnail !=undefined && thumbnail!=null){
            thumbnail = thumbnail.replace('background-image: url("', '').replace('")', '');

            dimensions[i].thumbnail = thumbnail;
        }
    }

    console.log('##############', dimensions);

    console.log('##############', dimensions.length);


})();