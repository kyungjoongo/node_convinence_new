var schedule = require('node-schedule');
const cheerio = require('cheerio')
/*var url = 'https://media.daum.net/proxy/api/mc2/contents/find.json?'
    + 'clusterId=129824&filterKey=cateInfo.category&filterVal=politics'
    + '&page=1&pageSize=20&range=1';*/

var category=[
    'economic',
    'digital',

];

var url = 'https://media.daum.net/proxy/api/mc2/contents/find.json?'
    + 'clusterId=129824&filterKey=cateInfo.category&filterVal='+ category[1]
    + '&page=1&pageSize=20&range=1';


var request = require('sync-request');
var res = request('GET', url,{

    headers: {"charset": "euc-kr", "Accept-Charset": "euc-kr"}
});
var content = JSON.parse(res.getBody('utf8'));


var contentMap= content.data[1];
console.log(content.data[1]);
var title= contentMap.title;
var bigImage = contentMap.image;

console.log('title--->',title);
console.log('bigImage--->',bigImage);



/*

var j = schedule.scheduleJob('*!/10 * * * * *', function (fireDate) {
    console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());
});

*/
