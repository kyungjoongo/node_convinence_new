var request = require("request");
var cheerio = require("cheerio");
var syncRequest = require('sync-request');


let url = 'https://m.apt2you.com/viewAptSaleHouseList.action'

request({url: url, method: 'GET'}, function (error, response, body) {

    var $ = cheerio.load(body);

    //console.log('##############', body);

    var resultsJson = [];


    $('.type01_top  > tbody > tr').each(function () {

        var title = $(this).find('.link_text').text();
        var itemNo = ($(this).find('.link_text').attr('onclick'))
        var date = $(this).find("td:eq(1)").text();

        resultsJson.push({
            title: title,
            itemNo: itemNo,
            date:date,

        })


    });



    console.log('##############', resultsJson);


})
