//var id = req.query.id;

var fs = require('fs');
var youtubedl = require('youtube-dl');
var ffmpeg = require('ffmpeg');
var video = youtubedl('https://www.youtube.com/watch?v=bxV-OOIamyk' ,
    // Optional arguments passed to youtube-dl.
    ['--format=251'],
    // Additional options can be given for calling `child_process.execFile()`.
    {cwd: __dirname});

// Will be called when the download starts.
var fileName= ''
video.on('info', function (info) {
    console.log('Download started');
    console.log('filename: ' + info._filename);
    console.log('size: ' + info.size);

    fileName = info.filename;
    console.log('##############'+ fileName);
});
video.pipe(fs.createWriteStream('E:/download_mp3/myvideo.mp4'));


try {
    var process = new ffmpeg('E:/download_mp3/myvideo.mp4');
    process.then(function (video) {
        // Callback mode
        video.fnExtractSoundToMP3('E:/download_mp3/test_audio_file.mp3', function (error, file) {
            if (!error)
                console.log('Audio file: ' + file);
            else{
                console.log('##############'+ '성공');
            }
        });
    }, function (err) {
        console.log('Error: ' + err);
    });
} catch (e) {
    console.log(e.code);
    console.log(e.msg);
}






/*
var ffmpegPath = 'C:/ffmpeg-20180227-fa0c9d6-win64-static/bin/ffmpeg.exe';


//set stream for conversion
proc = new ffmpeg({source: video, nolog: false});

//currently have ffmpeg stored directly on the server, and ffmpegLocation is the path to its location... perhaps not ideal, but what I'm currently settled on. And then sending output directly to response.
proc.setFfmpegPath(ffmpegPath);
proc.withAudioCodec('libmp3lame')
    .toFormat('mp3')
    .output(res)
    .run();*/
