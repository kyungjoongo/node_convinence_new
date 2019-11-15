var express = require('express');


var api_url = 'https://openapi.naver.com/v1/search/news.json?query='+ encodeURI('주택청약'); // json 결과
//   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // xml 결과
var request = require('request');
var options = {
    url: api_url,
    headers: {'X-Naver-Client-Id': 'e8G6hWbcN1XdeCN9DIgQ', 'X-Naver-Client-Secret': 'wCcRnTYrhN'}
};
request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {

        console.log(body)


    } else {
        /*res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);*/
        console.log('sdlkfsldkflsdkf', error)
    }
});
