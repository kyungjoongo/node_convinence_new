var request = require("request");
var cheerio = require("cheerio");
var syncRequest = require('sync-request');


let url = "https://www.venturesquare.net/page/1"


request({
    url: url, method: 'POST', headers: {
        "credentials": "include",
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
            "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1"
        },
        "referrer": "https://www.venturesquare.net/page/2",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "GET",
        "mode": "cors"
    }


}, function (error, response, body) {

    var $ = cheerio.load(body);

    //console.log('##############', response.body);

    var resultsJson = [];
    $('.type-post').each(function () {
        var title = $(this).find('.post-title').text().replace('\n\t\t\t\t\t\t', '')
        var content = $(this).find('.excerpt > p').text();
        var img = $(this).find('img').attr('src')
        var href = $(this).find('img').parent().attr('href')
        //post_info_date
        var date = $(this).find('time').text();
        resultsJson.push({
            title: title,
            href: href,
            img: img,
            content: content.toString().replace('\n', '').replace('\n', ''),
            date
        })
    });
    console.log('##############', resultsJson);


})
