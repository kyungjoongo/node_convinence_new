const yas = require('youtube-audio-server')

// Start listener (REST API).
const port = 4000
yas.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}.`)
})
