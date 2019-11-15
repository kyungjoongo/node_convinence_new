



const puppeteer = require('puppeteer');



(async () => {


    const browser = await puppeteer.launch({headless: true, args: ['--start-fullscreen', '--window-size=1920,1040']});

    const page = await browser.newPage();
    await page.goto('http://www.pictriev.com/?lang=ko#');
    //await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
    let fullImagePath = 'http://kyungjoon77.iptime.org:4000/images/temp_image454.jpg'

    await page.evaluate(async (fullImagePath) => {

        //alert('sdlkfsdlkf')
        /*

        */

        let result = $("#urltext").val(fullImagePath)

        $("#submit-url").trigger('click');

        return result;

    }, (fullImagePath));
    /* await new Promise(function (resolve) {
         setTimeout(resolve, 12* 1000)
     });*/


    await page.waitFor('.simfaces').then(async () => {

        let result = await page.evaluate(async () => {
            //return
            let resultsJson = [];
            await new Promise(function (resolve) {
                setTimeout(resolve, 1 * 1000)
            });

            console.log($('#search-result').html())
            $('.simfaces > li ').each(function () {
                //if ( i%5 ==2){
                var img = $(this).find('img').attr('src')
                //gauge-text
                var score = $(this).find('.gauge-text').text();
                var celub = $(this).find('a').text();
                var href = $(this).find('a').attr('href')

                resultsJson.push({
                    img: 'http://www.pictriev.com/'+ img,
                    score: score,
                    celub: celub,
                    href:href,
                })
            });

            return resultsJson;


        })

        console.log('##############' + JSON.stringify(result));
    });


})();