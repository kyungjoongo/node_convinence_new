const puppeteer = require('puppeteer');



(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox'],

    });
    const page = await browser.newPage();
    await page.goto('https://www.converto.io/kr');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {

        var resultsJson=[];

        //http://www.youtube.com/watch?v=pjTj-_55WZ8
        $('input[id="youtube-url"]').val('http://www.youtube.com/watch?v=pjTj-_55WZ8');



        await new Promise(function (resolve) {
            setTimeout(resolve, 1500)
        });

        $('.convert-btn')[0].click();


        await new Promise(function (resolve) {
            setTimeout(resolve, 1500)
        });


        alert('sdflksdflk')


    });

   // await browser.close();

    console.log('##############', dimensions);


})();