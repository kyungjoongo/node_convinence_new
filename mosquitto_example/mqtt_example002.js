var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {

    //client.publish('react_native', 'Hello 고경준 switch on')
    //client.publish('react_native', 'off')
    client.publish('react_native2', 'off')

})
