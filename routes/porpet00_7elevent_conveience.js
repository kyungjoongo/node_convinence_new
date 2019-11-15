const puppeteer = require('puppeteer');
const mysql = require('nodejs-mysql').default;
const cheerio = require('cheerio')
const config = {
    host: 'gazua.kyungjoongo.site',
    port: 3306,
    user: 'root',
    password: '1114',
    database: 'test'
}
var syncrequest = require('sync-request');
const db = mysql.getInstance(config)

for ( let j=1; j<=20; j++){

    let res = getData(j,3)

    console.log('##############', res);

    if ( res.length>0){
        for (var i = 0; i < res.length; i++) {

            db.exec('insert into ' + 'seven11products' + ' set ?', {
                type: res[i].type,
                image: res[i].image,
                prodName: res[i].prodName,
                prodPrice: res[i].prodPrice
            }).then(rows => {
                console.log('###########good' + JSON.stringify(rows));
            })
        }

    }
}



function getData(_page,tab) {


    var res = syncrequest('GET', 'http://www.7-eleven.co.kr/product/listMoreAjax.asp?intPageSize=20&cateCd1=&cateCd2=&cateCd3=&pTab='+ tab+ '&intCurrPage='+ _page);
    var $ = cheerio.load(res.getBody());

    var resultsJson = [];

    $('body  > li ').each(function () {

        var tag_list_01 = $(this).find('.tag_list_01').children().text();
        var img = $(this).find('img').attr('src');
        var alt = $(this).find('img').attr('alt');
        //price_list
        var price_list = $(this).find('.price_list').children().text();

        if ( tag_list_01 !=''){
            resultsJson.push({
                type : tag_list_01,
                image: 'http://www.7-eleven.co.kr/'+ img,
                prodName:alt,
                prodPrice:price_list
            })

        }


    });

    console.log('##############', resultsJson);
    return resultsJson;

}

