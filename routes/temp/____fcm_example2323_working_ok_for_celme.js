var admin = require("firebase-admin");

var serviceAccount = require("./face-celub-firebase-adminsdk-hqtu6-3401d7b3a9.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://face-celub.firebaseio.com"
});


let message = {
    notification: {
        title: '나와 닮은 연애인을 지금 바로 찾아보세요요요ㅛㅇ요ㅛ!!!!',
        body: 'Find a lover who looks like me right now !!'
    },
    //topic: topic
    condition: "!('anytopicyoudontwanttouse' in topics)"
};

// Send a message to devices subscribed to the provided topic.
admin.messaging().send(message).then((response) => {


    // Response is a message ID string.
    console.log('Successfully sent message:', response + "---->");
}).catch((error) => {
    console.log('Error sending message:', error);
});
