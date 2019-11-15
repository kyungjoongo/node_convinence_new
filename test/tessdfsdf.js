const puppeteer = require('puppeteer');

(async () => {
   // const browser = await puppeteer.launch();


    /*const browser = await puppeteer.launch({
        headless: false,
    });*/
    const browser = await puppeteer.launch({ headless: false, args: ['--start-fullscreen', '--window-size=1300,1040'] });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1040 });
    await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
    /*await page.pdf({path: 'hn.pdf', format: 'A4'});*/

    //await browser.close();
})();