const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true

    });
    const page = await browser.newPage();

    let url = 'http://www.drapt.com/sise/html_view5/total.php?no=55046'

    await page.goto(url);
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {

        var resultsJson = [];
        var index = 1;
        $('.one_table01 > tbody > tr').each(function () {

            var key = $(this).find('th').text().replace('\n', '').trim();
            var value = $(this).children().next().text()

            if (index === 3) {
                key = key.replace('공급면적전용면적일반분양가구수임대가구수장기전세주택가구수', '').trim();
                value = value.replace('공급면적', '')
                    .replace('전용면적', '')
                    .replace('일반분양가구수', '')
                    .replace('임대가구수', '')
                    .replace('장기전세주택가구수', '')
                    .replace('-\n', '')
                    .replace('\\n', '')
            }

            resultsJson.push({
                key: key,
                value: value,

            })

            index++;

        });


        return resultsJson;


    });


    console.log('##############', dimensions);

    console.log('##############', dimensions.length);


})();