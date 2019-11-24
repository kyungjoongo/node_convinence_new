var request = require("request");
var cheerio = require("cheerio");
var syncRequest = require('sync-request');


let url = "https://platum.kr/wp-admin/admin-ajax.php?action=grandnews_pagination_list"


request({
    url: url, method: 'POST', headers: {
        "credentials": "include",
        "headers": {
            "accept": "*/*",
            "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://platum.kr/",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": "offset=0&items=10&cat=",
        "method": "POST",
        "mode": "cors"
    }


}, function (error, response, body) {

    var $ = cheerio.load(body);

    //console.log('##############', response.body);

    var resultsJson = [];
    $('.type-post').each(function () {
        var title = $(this).find('.post_header_title').children().children().attr('title')
        var content = $(this).find('.post_header_title > p').text();
        var href = $(this).find('h5').children().attr('href')
        var img = $(this).find('img').attr('src')
        //post_info_date
        var date = $(this).find('.post_info_date > a').text();
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
