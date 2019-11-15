const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--window-size=1920x1080'],
        dumpio: true,
    });
    const page = await browser.newPage();
    await page.goto('http://www.saramin.co.kr/zf_user/jobs/list/job-category?' +
        'cat_cd=404&loc_cd=102190&search_optional_item=n&isAjaxRequest=0&page_count=200&sort=RL&type=job-category#searchTitle&page='+ 1);
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {

        let resultArray = []

       /* await new Promise(function (resolve) {
            setTimeout(resolve, 2000)
        });*/


        $('.recruiting_list   > tbody> tr ').each(function () {

            var tag_list_01 = $(this).find('.str_tit').text();
            var href = $(this).find('.str_tit').attr('href')
            //company_nm
            var company_nm = $(this).find('.company_nm').children().attr('title')
            //recruit_condition
            var recruit_condition = $(this).find('.career').text();
            var recruit_condition2 = $(this).find('.education').text();
            //deadlines
            var deadlines = $(this).find('.deadlines').text();

            //company_info
            var company_info = $(this).find('.employment_type').text();
            var company_info2 = $(this).find('.work_place').text();


            resultArray.push({
                type: tag_list_01,
                href:'http://www.saramin.co.kr'+ href,
                company_nm:company_nm.replace('관심기업 등록\n'+ '').replace('undefined', ''),
                recruit_condition: recruit_condition+ "|"+ recruit_condition2,
                deadlines: deadlines,
                company_info: company_info+ "|"+ company_info2,
            })


        });




        return resultArray;

    });

    /*await browser.close();*/

    console.log('##############', dimensions);


})();