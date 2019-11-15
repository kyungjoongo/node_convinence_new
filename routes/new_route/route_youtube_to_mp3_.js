var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const cheerio = require('cheerio')
var syncrequest = require('sync-request');
const puppeteer = require('puppeteer');
var YoutubeMp3Downloader = require("youtube-mp3-downloader");
var youtubeStream = require('youtube-audio-stream')


router.get('/youtube_stream/', function (req, res, next) {


    var requestUrl = 'http://youtube.com/watch?v=' + req.params.videoId
    try {
        youtubeStream(requestUrl).pipe(res)
    } catch (exception) {
        res.status(500).send(exception)
    }


});


router.get('/download_audio_001/', function (req, res, next) {
    /*

        video.on('info', function (info) {
            console.log('Download started');
            console.log('filename: ' + info._filename);
            console.log('size: ' + info.size);
            res.header('Content-Disposition', 'attachment; filename="' + info.size + ".m4a" + '"');
        });
        video.pipe(res);
        video.on('end', function () {
            //res.end({"status":"Completed"});
        });
    */


    //Configure YoutubeMp3Downloader with your settings
    var YD = new YoutubeMp3Downloader({
        "ffmpegPath": "/usr/local/bin/ffmpeg",        // Where is the FFmpeg binary located?
        "outputPath": "/Users/gilzako/temp",    // Where should the downloaded and encoded files be stored?
        "youtubeVideoQuality": "highest",       // What video quality should be used?
        "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
        "progressTimeout": 2000                 // How long should be the interval of the progress reports
    });

    //Download video and save as MP3 file
    YD.download("IPXIgEAGe4U");

    YD.on("finished", function (err, data) {

    });

    YD.on("error", function (error) {
        console.log(error);
    });

    YD.on("progress", function (progress) {
        console.log(JSON.stringify(progress));
    });

});


module.exports = router;