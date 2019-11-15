const puppeteer = require('puppeteer');
var urlencode = require('urlencode');


(async () => {
    const browser = await puppeteer.launch({
        headless: true

    });
    const page = await browser.newPage();

    let si ='서울특별시';
    let encodeValue= '';

    if ( si === '서울특별시'){
        encodeValue = '%BC%AD%BF%EF%C6%AF%BA%B0%BD%C3'
    }

    if ( si === '경기도'){
        encodeValue = '%B0%E6%B1%E2%B5%B5'
    }

    if ( si === '신도시'){
        encodeValue = '%BD%C5%B5%B5%BD%C3'
    }

    if ( si === '인천광역시'){
        encodeValue = '%C0%CE%C3%B5%B1%A4%BF%AA%BD%C3'
    }


    if ( si === '부산광역시'){
        encodeValue = '%BA%CE%BB%EA%B1%A4%BF%AA%BD%C3'
    }

    if ( si === '대구광역시'){

        encodeValue = '%B4%EB%B1%B8%B1%A4%BF%AA%BD%C3'
    }

    if ( si === '광주광역시'){
        encodeValue = '%B1%A4%C1%D6%B1%A4%BF%AA%BD%C3'
    }

    if ( si === '대전광역시'){

        encodeValue = '%B4%EB%C0%FC%B1%A4%BF%AA%BD%C3'
    }


    if ( si === '울산광역시'){
        encodeValue = '%BF%EF%BB%EA%B1%A4%BF%AA%BD%C3'
    }

    if ( si === '강원도'){
        encodeValue = '%B0%AD%BF%F8%B5%B5'
    }

    if ( si === '경상남도'){
        encodeValue = '%B0%E6%BB%F3%B3%B2%B5%B5'
    }
    if ( si === '전라남도'){
        encodeValue = '%C0%FC%B6%F3%B3%B2%B5%B5'
    }

    if ( si === '전라북도'){
        encodeValue = '%C0%FC%B6%F3%BA%CF%B5%B5'
    }

    if ( si === '세종특별자치시'){
        encodeValue = '%BC%BC%C1%BE%C6%AF%BA%B0%C0%DA%C4%A1%BD%C3'
    }

    if ( si === '충청남도'){
        encodeValue = '%BC%BC%C1%BE%C6%AF%BA%B0%C0%DA%C4%A1%BD%C3'
    }

    if ( si === '충청북도'){
        encodeValue = '%C3%E6%C3%BB%BA%CF%B5%B5'
    }

    if ( si === '제주도'){
        encodeValue = '%C1%A6%C1%D6%B5%B5'
    }

/*&gu=%B0%AD%B3%B2%B1%B8*/


    let url = 'http://www.drapt.com/e_sale/index.htm?page_name=saleinfo&menu_key=8&si='+encodeValue + '&gu='+'%B0%AD%B3%B2%B1%B8' + '&dong=&sear_date=&sigong=&gubun=&viewline=30'

    await page.goto(url);
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {

        var resultsJson = [];


        $('.siselist_2010 > tbody > tr').each(function () {

            var txt_name = $(this).find('.link_busi').text();
            //txt_loca
            var txt_loca = $(this).find('.txt_loca').text();
            //href
            var href = ($(this).find('.link_busi').attr('href'))
            //txt_date
            var txt_date = $(this).find('.txt_date').text();
            //txt_kind
            var txt_kind = $(this).find('.txt_kind').text();
            //txt_builder
            var txt_builder = $(this).find('.txt_builder').text();

            if ( txt_name != ''){
                resultsJson.push({
                    txt_name: txt_name,
                    txt_loca:txt_loca,
                    href:href,
                    txt_date:txt_date,
                    txt_kind:txt_kind,
                    txt_builder:txt_builder,


                })
            }




        });

        return resultsJson;


    });


    dimensions.forEach(elementOne => {

        let __href = (elementOne.href).replace('javascript:saleDetailInfo(\'', '').replace('\');', '')
        console.log('', __href);

        elementOne.href ='http://www.drapt.com/sise/html_view5/?no=55046&content_url=total.php%3Fno='+  __href
    });

    console.log('##############', dimensions);

    console.log('##############', dimensions.length);


})();