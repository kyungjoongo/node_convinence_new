var express = require('express');
var router = express.Router();
var beautify = require("json-beautify");
var cheerio = require('cheerio');
var requestPromise = require('request-promise')
var request = require('request');
var syncRequest = require('sync-request');
var querystring = require('querystring');
var striptags = require('striptags');
var prettyjson = require('prettyjson');
const mysql = require('nodejs-mysql').default;
const config = {
    //host: '35.201.132.249',
    host: 'gazua.kyungjoongo.site',
    port: 3306,
    user: 'root',
    password: '1114',
    database: 'test'
}
const connection = mysql.getInstance(config)


router.get('/daum_image_search_v2', function (req, last_response, next) {



    var page = req.query.page;

    if (req.query.page !=undefined){
        page=1;
    }
    var query = req.query.query;

    var querystring = require('querystring');
    var striptags = require('striptags');
    var prettyjson = require('prettyjson');
    var axios = require('axios');
   // var query = '평창+컬링'

    var querystring = require('querystring');
    var encodedQuery = querystring.escape(query);
    var querystring = require('querystring');
    var prettyjson = require('prettyjson');

    var instance = axios.create({
        baseURL: 'https://dapi.kakao.com/v2/search/image?query=' + encodeURI(query) + '&page='+ page+ '&size=10',
        headers: {
            'Authorization': 'KakaoAK 28449fe1535e7f4f2d0d605b5a1af7a6',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        responseType: 'json'
    });

    /*const wes = await axios('https://api.github.com/users/wesbos');
     console.log(wes.data); // mediocre code*/

    let responseJson = instance.get().then(responseJson => {

        console.log('##############' + JSON.stringify(responseJson.data.documents));

        var __results = responseJson.data.documents;

        console.log(prettyjson.render(__results, {noColor: true}));

        last_response.json(__results);

    })

});


router.get('/naver_news_image_v3', function (req, last_response, next) {
    var page = req.query.page;
    var query = req.query.query;
    var imagequery = req.query.imagequery;

    var prettyjson = require('prettyjson');
    var querystring = require('querystring');
    var striptags = require('striptags');



//    var displaySize= 10;
    var pageStart = (page - 1) * 10 + 1;


    request({
        uri: 'https://openapi.naver.com/v1/search/news.json?query=' + encodeURI(query) + '&start=' + pageStart + '&display=10',
        headers: {'X-Naver-Client-Id': 'e8G6hWbcN1XdeCN9DIgQ', 'X-Naver-Client-Secret': 'wCcRnTYrhN'},
        method: 'GET'
    }, function (err, _response, body) {
        //it works!

        var dataJson= (JSON.parse(body)).items;


        var __result = syncRequest('GET', 'https://openapi.naver.com/v1/search/image?query=' + encodeURI(imagequery) + '&display=10&start='+ pageStart+ '&sort=sim&filter=large',
            {
                headers: {'X-Naver-Client-Id': 'e8G6hWbcN1XdeCN9DIgQ', 'X-Naver-Client-Secret': 'wCcRnTYrhN'},
            }
        );

        var body = __result.getBody();
        var imageDataResult = JSON.parse(body).items;



        for (var i = 0; i < imageDataResult.length; i++) {

            console.log('##############', imageDataResult[i].link);

            dataJson[i].imageLink = imageDataResult[i].link;

        }//for end


        console.log(prettyjson.render(dataJson ,{noColor: true}));

        last_response.json(dataJson)

    });

});


router.get('/get_n_images', function (req, last_response, next) {

    var page = req.query.page;
    var query = req.query.query;
    var pageStart = (page - 1) * 10 + 1;
    console.log('################' + pageStart);

   // var api_url = 'https://openapi.naver.com/v1/search/image?display=10&start='+pageStart + '&sort=sim&query='+ encodeURI(query); // json 결과

    var api_url = 'https://openapi.naver.com/v1/search/image?display=10&start='+pageStart + '&sort=sim&query='+ encodeURI(query);
    var striptags = require('striptags');
    var prettyjson = require('prettyjson');


    request({
        url: api_url,
        headers: {'X-Naver-Client-Id': 'e8G6hWbcN1XdeCN9DIgQ', 'X-Naver-Client-Secret': 'wCcRnTYrhN'},
        method: 'GET'
    }, function (err, _response, body) {
        //it works!

        var blogArrray= JSON.parse(body);


        for ( var i=0; i<blogArrray.items.length;i++){


            console.log('##############'+ striptags(blogArrray.items[i].title))

            var title= striptags(blogArrray.items[i].title);

            var link = blogArrray.items[i].link.replace('&amp;', '&')


            blogArrray.items[i].title = title;
            blogArrray.items[i].link = link;

        }


        console.log(prettyjson.render(blogArrray.items ,{noColor: true}));

        last_response.json(blogArrray.items)

    });


});


module.exports = router;
