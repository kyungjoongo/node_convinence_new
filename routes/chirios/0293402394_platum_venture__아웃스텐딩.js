var request = require("request");
var cheerio = require("cheerio");
var syncRequest = require('sync-request');

let url = "http://www.startupweekly.net/api/news?" +
    "filter=%7B%22where%22:%7B%7D,%22order%22:%22datetime+DESC%22,%22limit%22:%22"+ 30 + "%22,%22skip%22:"+ 0 + "%7D"


request({
    url: url, method: 'GET',

}, function (error, response, body) {

    var $ = cheerio.load(body);

    console.log('##############', response.body);

    let responseResult = JSON.parse(response.body);

    var resultsJson = [];
    responseResult.forEach(item => {

        console.log("sldkflsdkfldskf===>", item);

        let date=item.created
        let _date = new Date(date)
        _date=_date.toLocaleDateString("ko-KR");

        resultsJson.push({
            title: item.title,
            href: item.link,
            img: '',
            content: item.field,
            date: _date,
        })
    })


    console.log('##############', resultsJson);


})
