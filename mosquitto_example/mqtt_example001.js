var mqtt = require('mqtt')
//1883port
var client  = mqtt.connect('mqtt://kyungjoon77.iptime.org')

client.on('connect', function () {
    client.subscribe('kyungjoon_chat1', function (err) {
        if (!err) {
            client.publish('kyungjoon_chat1', 'Hello mqtt')
        }
    })
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
})