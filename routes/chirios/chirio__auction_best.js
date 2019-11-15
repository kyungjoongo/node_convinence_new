var request = require("request");
var cheerio = require("cheerio");
var syncRequest = require('sync-request');


let url = 'http://www.drapt.com/e_sale/index.htm?page_name=brief_msgN&menu_key=19&start=0'

request({url: url, method: 'GET'}, function (error, response, body) {

    var $ = cheerio.load(body);

    var resultsJson = [];


    $('.common_table03  > tbody > tr').each(function () {

        var key = $(this).find("td:eq(0)").text();
        var title = $(this).find("td:eq(1)").text();
        var href = $(this).find("td:eq(1)").children().children().attr('href')

        //var __hrefarr = href.split('uid');

        let baseUrl='http://www.drapt.com/e_sale/'


        if ( title !=''){
            resultsJson.push({
                key: key,
                title: title,
                href:  href,

            })
        }




    });


    return resultsJson;



    console.log('##############', resultsJson);


})







