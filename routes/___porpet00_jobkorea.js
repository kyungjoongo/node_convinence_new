const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--window-size=1920x1080'],
        dumpio: true,
    });
    const page = await browser.newPage();


    await page.goto('http://m.jobkorea.co.kr/list_gi/gi_part_list.asp?page=1&TS_AreaCode=B150&TS_BAreaCode=B000&TS_PartNo=1000100&SPage=0&SPageSize=0&AddList=&HEnd=0');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {

        let resultArray = []

       /* await new Promise(function (resolve) {
            setTimeout(resolve, 2000)
        });*/


        $('.mBooth    > ul> li ').each(function () {

            var company = $(this).find('strong').text();
            var href = $(this).children().attr('href');
            //txt
            var title = $(this).find('.txt').text();

            //desc
            var desc = $(this).find('.desc').text().replace('\n\t\t\t', '').replace('\n\t\t\t','').replace('\t','')


            resultArray.push({
                company: company,
                title : title,
                desc:desc,
                href:'http://m.jobkorea.co.kr/'+ href,
            })


        });




        return resultArray;

    });

    /*await browser.close();*/

    console.log('##############', dimensions);


})();