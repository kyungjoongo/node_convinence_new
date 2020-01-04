var schedule = require('node-schedule');
var OneSignal = require('onesignal-node');
//var request = require('request-promise');
var request = require("request");

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//todo: 매5분마다 실행...
/*var j = schedule.scheduleJob('*!/1 * * * *', function (fireDate) {
    fetchAndpushFcm();
});*/

fetchAndpushFcm();



function fetchAndpushFcm() {
    var cheerio = require("cheerio");

    var articleType = 'kkomkkom/';
    var articleType2 = 'popular/';

    request({url: 'https://media.daum.net/ranking/popular/', method: 'GET'}, function (error, response, body) {


        console.log('live--->', body);
        var $ = cheerio.load(body);

        var resultsJson = [];

        $('.list_news2 > li').each(function () {
            var title = $(this).find('.link_txt').text();

            var href = $(this).find('.link_txt').attr('href')

            //thumb_g
            var image = $(this).find('.thumb_g').attr('src')

            if (image == undefined) {
                image = '';
            } else {
                image = 'http:' + image;
            }

            console.log('live--->', image);

            resultsJson.push({
                title,
                href,
                image,
            });


        });

        //console.log('live--->', (resultsJson));

        //todo:sdlfsdlfk
        //todo:sdlfsdlfk
        //todo:sdlfsdlfk
        var articleNo = getRandomInt(35);
        //var articleNo = 49;

        console.log('live--->', resultsJson);
        callNoti(resultsJson[articleNo].title, resultsJson[articleNo].href, resultsJson[articleNo].image)

    });


// first we need to create a client


}

function callNoti(title, href, paramImage) {

    console.log('live--->', (title));
    console.log('live--->', (href));
    console.log('live--->', (paramImage));

    var myClientAllireo = new OneSignal.Client({
        app: {
            appAuthKey: 'NjdiNDQyYmEtMjYyOC00OTJkLWExMDMtNWJjNjVmOWQzMjY4',
            appId: 'fadef024-2f44-4077-9611-1a0fe847faf3'
        }
    });

    var clientHonkacola = new OneSignal.Client({
        app: {
            appAuthKey: 'YWE1MDdhMDgtMzYyYy00MjgxLWI0ZTEtOTMzZDMwZmQ1M2Q4',
            appId: 'c965f198-3c23-4278-bb29-546344021f5f'
        }
    });

    // we need to create a notification to send
    //todo:big_picture
    var firstNotification = new OneSignal.Notification({
        contents: {
            en: title,
        }
    });
    var firstNotificationHongka = firstNotification;
    //todo:big_picture
    //todo:big_picture
    var big_picture = paramImage;

    var image_allireo = paramImage;
    var image_hongka = paramImage

    /*var image_allireo = paramImage;
    var image_hongka = paramImage;*/

    firstNotification.postBody["included_segments"] = ["Active Users"];
    //firstNotification.postBody["big_picture"] = big_picture;
    firstNotification.postBody["large_icon"] = image_allireo;
    firstNotification.postBody["data"] = {
        "url": href,
        "title": title,
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
    //firstNotificationHongka.postBody["big_picture"] = big_picture;
    firstNotificationHongka.postBody["large_icon"] = image_hongka;
    firstNotificationHongka.postBody["data"] = {
        "url": href,
        "title": title,
    };


    clientHonkacola.sendNotification(firstNotificationHongka, function (err, httpResponse, data) {
        if (err) {
            console.log('Something went wrong...');
        } else {
            console.log(data, httpResponse.statusCode);
        }
    });

}
