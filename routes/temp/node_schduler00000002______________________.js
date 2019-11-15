var schedule = require('node-schedule');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


var OneSignal = require('onesignal-node');
//images
const cheerio = require('cheerio')

var category = [
    'politics',
    'economic',
    'digital',
    'culture',

];

var url = 'https://media.daum.net/proxy/api/mc2/contents/find.json?'
    + 'clusterId=129824&filterKey=cateInfo.category&filterVal=' + category[1]
    + '&page=1&pageSize=20&range=1';

var request = require('sync-request');
var res = request('GET', url, {

    headers: {"charset": "euc-kr", "Accept-Charset": "euc-kr"}
});
var content = JSON.parse(res.getBody('utf8'));


//todo: array 1번째 데이타
//todo: array 1번째 데이타
//todo: array 1번째 데이타
var rand_no = getRandomInt(15);

var contentMap = content.data[rand_no];
console.log(content.data[rand_no]);

var fetchedTitle = contentMap.title;
var fetchedImage = contentMap.image[0];

console.log('_title--->', fetchedTitle);
console.log('_big_image--->', fetchedImage);


// first we need to create a client
var myClientAllireo = new OneSignal.Client({
    app: {appAuthKey: 'NjdiNDQyYmEtMjYyOC00OTJkLWExMDMtNWJjNjVmOWQzMjY4', appId: 'fadef024-2f44-4077-9611-1a0fe847faf3'}
});

var clientHonkacola = new OneSignal.Client({
    app: {appAuthKey: 'YWE1MDdhMDgtMzYyYy00MjgxLWI0ZTEtOTMzZDMwZmQ1M2Q4', appId: 'c965f198-3c23-4278-bb29-546344021f5f'}
});

// we need to create a notification to send
//todo:big_picture
var firstNotification = new OneSignal.Notification({
    contents: {
        en: fetchedTitle,
    }
});
var firstNotificationHongka = firstNotification;

//todo:big_picture
//todo:big_picture
var big_picture = fetchedImage;

//var image_allireo = 'https://pbs.twimg.com/profile_images/882490461214003200/ZN-29Tmi.jpg';
//http://www.goodmorningcc.com/news/photo/201901/206196_207434_858.jpg
var image_allireo = 'http://www.goodmorningcc.com/news/photo/201901/206196_207434_858.jpg';

//
//var image_hongka = 'https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-1/p200x200/19114083_428058310896230_8335977417851156502_n.jpg?_nc_cat=104&_nc_ht=scontent-icn1-1.xx&oh=32cbe7da84ae3649f7ce30fb3a630152&oe=5D456E5E'
var image_hongka = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bcBgpHKwWNShatGStM-Fm8xiKu7tlaafVTIrrFGM9NZE5xO-'


// set target users
//firstNotification.postBody["headings"] = {"en": "English Title"};
firstNotification.postBody["included_segments"] = ["Active Users"];
firstNotification.postBody["big_picture"] = big_picture;
firstNotificationHongka.postBody["included_segments"] = ["Active Users"];
firstNotificationHongka.postBody["big_picture"] = big_picture;
firstNotification.postBody["large_icon"] = image_allireo;

// send this notification to All Users except Inactive ones
myClientAllireo.sendNotification(firstNotification, function (err, httpResponse, data) {
    if (err) {
        console.log('Something went wrong...');
    } else {
        console.log(data, httpResponse.statusCode);
    }
});

firstNotificationHongka.postBody["large_icon"] = image_hongka;

clientHonkacola.sendNotification(firstNotificationHongka, function (err, httpResponse, data) {
    if (err) {
        console.log('Something went wrong...');
    } else {
        console.log(data, httpResponse.statusCode);
    }
});
