var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://125.132.40.20')

client.on('connect', function () {
    client.subscribe('myTopic')

    client.subscribe('topic002');

})

client.on('message', function (topic, message) {

    context = message.toString();
    console.log(context)
})