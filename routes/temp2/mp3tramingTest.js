const stream = require('youtube-audio-stream')
const url = 'http://youtube.com/watch?v=oBB1SIg2MdI'


var getAudio = function (req, res) {
    var requestUrl = 'http://youtube.com/watch?v=' +'oBB1SIg2MdI'
    try {
        stream(requestUrl).pipe(res)
    } catch (exception) {
        res.status(500).send(exception)
    }
}