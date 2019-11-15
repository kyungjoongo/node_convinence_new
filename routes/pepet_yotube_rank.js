const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true

    });
    const page = await browser.newPage();

    var query = encodeURI('pink what about us album art')
    //await page.goto('https://www.youtube.com/playlist?list=PLx0sYbCqOb8QTF1DCJVfQrtWknZFzuoAE');


    //https://www.youtube.com/playlist?list=PLw-VjHDlEOgvtnnnqWlTqByAtC7tXBg6D
    await page.goto('https://www.youtube.com/playlist?list=PLw-VjHDlEOgvtnnnqWlTqByAtC7tXBg6D');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {

        var resultsJson = [];


        //window.scrollBy(0, 10000);

        $("html, body").animate({ scrollTop: $(document).height() }, 3000);


        await new Promise(function(resolve) {
            setTimeout(resolve, 4000)
        });



        var i = 1;
        $('#contents > ytd-playlist-video-renderer  ').each(function () {


            var thumbnail = $(this).find('#img').attr('src')

            var title = $(this).find('#meta').children().children().next().text();

            //yt-formatted-string
            var rank = $(this).find('#index').text()
            //thumbnail


            //yt-simple-endpoint
            var endpoint = $(this).find('.yt-simple-endpoint').attr('href');

            let arr_end_point = endpoint.split('?v=');

            console.log('##############', arr_end_point);

            let _id = arr_end_point[1].split('&');

            resultsJson.push({
                rank: rank,
                title: title,
                thumbnail: thumbnail,
                endpoint: _id[0],
            })

            i++;

        });

        return resultsJson;


    });

    /*await browser.close();*/

    console.log('##############', dimensions);


})();