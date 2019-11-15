var request = require("request");
var cheerio = require("cheerio");
var syncRequest = require('sync-request');


let url = 'http://www.drapt.com/e_sale/index.htm?page_name=saleinfo&menu_key=8&si=%B0%E6%B1%E2%B5%B5&gu=%BC%BA%B3%B2%BD%C3'

request({url: url, method: 'GET'}, function (error, response, body) {

    var $ = cheerio.load(body);

    var resultsJson = [];


    $('.siselist_2010 > tbody > tr').each(function () {

        var image = $(this).html();


        resultsJson.push({
            image: image,


        })


    });



    console.log('##############', resultsJson);


})







