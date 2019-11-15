var admin = require("firebase-admin");

var serviceAccount = require("./chungwade-minwon-firebase-adminsdk-p1s7i-c1e98ada6f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //databaseURL: "<your database URL here>"
});

const cheerio = require('cheerio')
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
let category=[
    'politics',
    'economic',
    'digital',
    'culture',

];

let url = 'https://media.daum.net/proxy/api/mc2/contents/find.json?'
    + 'clusterId=129824&filterKey=cateInfo.category&filterVal='+ category[0]
    + '&page=1&pageSize=100&range=1';


let request = require('sync-request');
let res = request('GET', url,{
    headers: {"charset": "euc-kr", "Accept-Charset": "euc-kr"}
});
let content = JSON.parse(res.getBody('utf8'));
//todo: array 1번째 데이타
let ariticleNumber=getRandomInt(25);
let contentMap= content.data[ariticleNumber];
let fetchedTitle= contentMap.title;
console.log('key--->',contentMap._id.key);
let fetchedImage = contentMap.image[0];

let message = {
    notification: {
        title: fetchedTitle,
        body: ''
    },
    //topic: topic
    condition: "!('anytopicyoudontwanttouse' in topics)"
};

// Send a message to devices subscribed to the provided topic.
admin.messaging().send(message)
    .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response + "---->"+ fetchedTitle);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
    });
