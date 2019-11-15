var OneSignal = require('onesignal-node');
//images

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
        en: "김연철, 최소 네차례 '다운계약서' 의혹\n" ,
        //ko: "1인 방송에 빠진 TV… 시청률은? \"글쎄\"\n",
    }
});
var firstNotificationHongka = firstNotification;

//todo:big_picture
var big_picture= "http://image.chosun.com/sitedata/image/201903/25/2019032500285_0.jpg";

var image_allireo= 'https://firebasestorage.googleapis.com/v0/b/allieo-yoosimin.appspot.com/o/Screen%20Shot%202019-03-23%20at%209.12.49%20AM.png?alt=media&token=5b1c45e0-2c88-4007-abd6-11cf51b3aa8b';
var image_hongka='https://firebasestorage.googleapis.com/v0/b/allieo-yoosimin.appspot.com/o/Screen%20Shot%202019-03-22%20at%208.40.07%20PM.png?alt=media&token=938f44d1-f357-496c-b1bc-a5f5e64343fd'


// set target users
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