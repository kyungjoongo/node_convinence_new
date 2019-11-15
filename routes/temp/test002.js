var ytdl = require('ytdl-core')


let uri='http://youtube.com/watch?v=x3bfa3DZ8JM'

ytdl.getInfo(uri, {
    //videoFormat: 'mp4',
    quality: 'lowest',
    audioFormat: 'mp3',
},(err,info)=>{

    console.log('live--->',info.formats.length);

    console.log('live--->',info.formats[17]);

    let reesult=info.formats[17]

})

//console.log('live--->',video);

