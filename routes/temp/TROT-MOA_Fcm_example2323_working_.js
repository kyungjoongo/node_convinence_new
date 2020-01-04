var admin = require("firebase-admin");

var serviceAccount = require("./tns-trot-moa-admin-sdk");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //databaseURL: "<your database URL here>"
});


let message = {
    notification: {
        title: '기분이 쳐졌다면 김연자의 아모르파티를 당장 듣자!!',
        //title: '주현미의 신사동 그사람 나갑니다!!!',
        //body: 'Find a lover who looks like me right now !!'
    },
    //topic: topic
    condition: "!('anytopicyoudontwanttouse' in topics)"
};

// Send a message to devices subscribed to the provided topic.
admin.messaging().send(message).then((response) => {
    console.log('Successfully!!!!!!!sent!!', response + "---->");
})
    .catch((error) => {
        console.log('Error sending message:', error);
    });
