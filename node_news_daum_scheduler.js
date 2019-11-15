var schedule = require('node-schedule');
var OneSignal = require('onesignal-node');


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//todo: 매5분마다 실행...
var j = schedule.scheduleJob('*/60 * * * *', function (fireDate) {
    fetchAndpushFcm();
});

function fetchAndpushFcm(){
    var category = [
        'politics',
        'economic',
        'digital',
        'culture',
    ];

    var url = 'https://media.daum.net/proxy/api/mc2/contents/find.json?'
        + 'clusterId=129824&filterKey=cateInfo.category&filterVal=' + category[0]
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
    var contentUrl= 'https://entertain.v.daum.net/v/'+ contentMap._id.key;

    console.log('urlurlurl--->',url);
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

    var image_allireo = 'http://www.goodmorningcc.com/news/photo/201901/206196_207434_858.jpg';
    var image_hongka = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bcBgpHKwWNShatGStM-Fm8xiKu7tlaafVTIrrFGM9NZE5xO-'

    firstNotification.postBody["included_segments"] = ["Active Users"];
    firstNotification.postBody["big_picture"] = big_picture;
    firstNotification.postBody["large_icon"] = image_allireo;
    firstNotification.postBody["data"] = {
        "url": contentUrl,
        "title": fetchedTitle,
    };

    //todo:android_sound
    firstNotification.postBody["android_sound"] = 'nil';
    firstNotificationHongka.postBody["android_sound"] = 'nil';

// send this notification to All Users except Inactive ones
    myClientAllireo.sendNotification(firstNotification, function (err, httpResponse, data) {
        if (err) {
            console.log('Something went wrong...');
        } else {
            console.log(data, httpResponse.statusCode);
        }
    });
    firstNotificationHongka.postBody["included_segments"] = ["Active Users"];
    firstNotificationHongka.postBody["big_picture"] = big_picture;
    firstNotificationHongka.postBody["large_icon"] = image_hongka;
    firstNotificationHongka.postBody["data"] = {
        "url": contentUrl,
        "title": fetchedTitle,
    };

    clientHonkacola.sendNotification(firstNotificationHongka, function (err, httpResponse, data) {
        if (err) {
            console.log('Something went wrong...');
        } else {
            console.log(data, httpResponse.statusCode);
        }
    });

}
