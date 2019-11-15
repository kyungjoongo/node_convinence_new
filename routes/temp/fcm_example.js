var fcm = require('fcm-notification');
var FCM = new fcm('./allieo-yoosimin-firebase-adminsdk-ut7fg-b9f6a0c8a7.json');
var token = 'AIzaSyCb5xBPDV6IIRBWQLzmuExrt2Jx11X8un0';

var message = {
    data: {    //This is only optional, you can send any data
        score: '850',
        time: '2:45'
    },
    notification:{
        title : 'Title of notification',
        body : 'Body of notification'
    },
    token : token
};

FCM.send(message, function(err, response) {
    if(err){
        console.log('error found', err);
    }else {
        console.log('response here', response);
    }
})