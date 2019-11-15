var OneSignal = require('onesignal-node');
//images

// first we need to create a client
var myClientAllireo = new OneSignal.Client({
    app: {appAuthKey: 'NjdiNDQyYmEtMjYyOC00OTJkLWExMDMtNWJjNjVmOWQzMjY4', appId: 'fadef024-2f44-4077-9611-1a0fe847faf3'}
});

var clientHonkacola = new OneSignal.Client({
    app: {appAuthKey: 'YWE1MDdhMDgtMzYyYy00MjgxLWI0ZTEtOTMzZDMwZmQ1M2Q4', appId: 'c965f198-3c23-4278-bb29-546344021f5f'}
});

//todo:################################
//todo:title
var title = '\n' +
    '정준영 대화방 구성원들, 추가 집단 성폭행 정황...사건 새국면' ;



//todo:big_picture
var big_picture = "https://image.ytn.co.kr/general/jpg/2019/0423/201904230321052635_t.jpg";
//todo:URL
var url = ''

//todo:################################

var alllireoFirstNotification = new OneSignal.Notification({
    contents: {
        en: title,
    }
});
var firstNotificationHongka = alllireoFirstNotification;




/*var image_allireo= big_picture;
var image_hongka= big_picture;*/

//var image_allireo = 'https://pbs.twimg.com/profile_images/882490461214003200/ZN-29Tmi.jpg';
//http://www.goodmorningcc.com/news/photo/201901/206196_207434_858.jpg
var image_allireo = 'https://pbs.twimg.com/profile_images/882490461214003200/ZN-29Tmi.jpg';
var image_hongka = 'https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-1/p200x200/19114083_428058310896230_8335977417851156502_n.jpg?_nc_cat=104&_nc_ht=scontent-icn1-1.xx&oh=32cbe7da84ae3649f7ce30fb3a630152&oe=5D456E5E'


// set target users
//firstNotification.postBody["headings"] = {"en": "English Title"};
alllireoFirstNotification.postBody["included_segments"] = ["Active Users"];
alllireoFirstNotification.postBody["big_picture"] = big_picture;
alllireoFirstNotification.postBody["data"] = {
    "url": url,
    "title": title,
};


firstNotificationHongka.postBody["included_segments"] = ["Active Users"];
firstNotificationHongka.postBody["big_picture"] = big_picture;
alllireoFirstNotification.postBody["large_icon"] = image_allireo;


//todo:android_sound
firstNotificationHongka.postBody["android_sound"] = 'nil';
alllireoFirstNotification.postBody["android_sound"] = 'nil';

// send this notification to All Users except Inactive ones
myClientAllireo.sendNotification(alllireoFirstNotification, function (err, httpResponse, data) {
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