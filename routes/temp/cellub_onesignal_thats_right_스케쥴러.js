var schedule = require('node-schedule');
var OneSignal = require('onesignal-node');


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//todo: 매5분마다 실행...
/*var j = schedule.scheduleJob('*!/1 * * * *', function (fireDate) {

});*/


fetchAndpushFcm();

function fetchAndpushFcm(){


// first we need to create a client
    var myClientAllireo = new OneSignal.Client({
        app: {appAuthKey: 'MTlkNWFlYjYtNDI1NC00YjlkLTg1NTAtMDhkNjU0NzNlNzIy', appId: '40cdb92c-d853-4f33-8be9-34c7e0bd5c3e'}
    });


    var image_allireo = 'http://www.goodmorningcc.com/news/photo/201901/206196_207434_858.jpg';

    var firstNotification = new OneSignal.Notification({
        contents: {
            en: 'Find a lover who looks like me right now !!\n나와 닮은 연애인을 지금 바로 찾아보세요요!!',
        }
    });

    firstNotification.postBody["included_segments"] = ["Active Users"];
    //firstNotification.postBody["big_picture"] = big_picture;
    //firstNotification.postBody["large_icon"] = image_allireo;

// send this notification to All Users except Inactive ones
    myClientAllireo.sendNotification(firstNotification, function (err, httpResponse, data) {
        if (err) {
            console.log('Something went wrong...');
        } else {
            console.log(data, httpResponse.statusCode);
        }
    });

}
