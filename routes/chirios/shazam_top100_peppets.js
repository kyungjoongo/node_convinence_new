const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,

    });
    const page = await browser.newPage();

    //let url = 'https://www.shazam.com/charts/top-100/united-states'
  //  let url = 'https://www.shazam.com/charts/top-100/south-korea'
    let url= 'https://www.shazam.com/charts/top-100/world'

    await page.goto(url);
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {
        await new Promise(function(resolve) {
            setTimeout(resolve, 3000)
        });
        /*$("html, body").animate({ scrollTop: $(document).height() }, 3000);*/
        window.scrollTo(0,document.body.scrollHeight);

        await new Promise(function(resolve) {
            setTimeout(resolve, 4000)
        });



        var resultsJson = [];


        $('.inner-content > .charttracks > ul  > li ').each(function () {

            var number = $(this).find('.number').text();
            var title = $(this).find('.title').children().next().text();
            var artist = $(this).find('.artist').children().next().text();
            var image = $(this).find('.image ').children().attr('src');
            var audio = $(this).find('meta[itemprop="audio"]').attr('content');


            resultsJson.push({
                number: number,
                title: title,
                artist:artist,
                image: image,
                audio:audio,


            })


        });


        return resultsJson;


    });


    console.log('##############', dimensions);

    console.log('##############', dimensions.length);


})();