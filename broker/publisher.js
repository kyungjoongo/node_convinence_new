var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://125.132.40.20');

client.on('connect', function () {

    setInterval(function() {
        client.publish('myTopic', 'Hello mqtt');
        console.log('Message Sent');
    }, 5000);

    setInterval(function() {
        client.publish('topic002', 'react native is grate library');
        console.log('Message Sent');
    }, 3000);

});