var request = require("request");
var cheerio = require("cheerio");
var syncRequest = require('sync-request');


let url = 'https://youtube2mp3api.com/@api/button/mp3/xuAH21DkJow'

request({url: url, method: 'GET'}, function (error, response, body) {

    var $ = cheerio.load(body);


    console.log('##############'+ body);
    let resultArray=[]

    setTimeout(()=>{
        let url= $('.download-result > #download_link').children().attr('href')

        let fullUrl= "http:"+ url;

        resultArray.push({
            'link' : fullUrl
        })
        resultArray.push({
            'link' : fullUrl
        })
        resultArray.push({
            'link' : fullUrl
        })
        resultArray.push({
            'link' : fullUrl
        })

        return resultArray;
    },4000)



    console.log('##############', resultArray);


})







