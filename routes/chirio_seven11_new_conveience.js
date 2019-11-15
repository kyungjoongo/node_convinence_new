var request = require("request");
var cheerio = require("cheerio");
var syncRequest = require('sync-request');
var Iconv1 = require('iconv').Iconv;


var baseUri='http://www.7-eleven.co.kr/product/listMoreAjax.asp?intPageSize=10&cateCd1=&cateCd2=&cateCd3=&pTab=3&intCurrPage=1'


var res = syncRequest('GET', baseUri);

var $ = cheerio.load(res.getBody());

var resultsJson = [];


$('body  > li ').each(function () {

    var tag_list_01 = $(this).find('.tag_list_01').children().text();
    var img = $(this).find('img').attr('src');
    var alt = $(this).find('img').attr('alt');
    //price_list
    var price_list = $(this).find('.price_list').children().text();

    if (tag_list_01 != '') {
        resultsJson.push({
            type: tag_list_01,
            image: 'http://www.7-eleven.co.kr/' + img,
            desc: alt,
            price: price_list
        })

    }


});


console.log('##############'+ resultsJson);









