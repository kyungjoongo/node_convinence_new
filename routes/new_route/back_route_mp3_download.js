var express = require('express');
var querystring = require('querystring');
var router = express.Router();
var beautify = require("json-beautify");
var cheerio = require('cheerio');
var request = require('request');
var striptags = require('striptags');
var prettyjson = require('prettyjson');
var fs = require('fs');
var youtubedl = require('youtube-dl');
var ffmpeg = require('fluent-ffmpeg');
var btc = require('better-try-catch')
const puppeteer = require('puppeteer');

router.get('/get_album_art', function (req, last_response, next) {

    let query = req.query.query;

    (async () => {
        const browser = await puppeteer.launch(
            {
                headless: true,
                args: ['--no-sandbox'],
                dumpio: true,

            });
        const page = await browser.newPage();

        await page.goto('https://www.google.co.kr/search?q=' + encodeURI(query + ' album art') + '&dcr=0&tbm=isch&source=iu&ictx=1&fir=6VaCUPcyhIsZvM%253A%252CMshOIwMpwui8KM%252C_&usg=__jBNdgISvH-_qdiws6zKBm1Khl54%3D&sa=X&ved=0ahUKEwiIqIGx8tvZAhVBuJQKHUunC-kQ9QEIJzAA#imgrc=6VaCUPcyhIsZvM:');
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {


            $('.rg_ic').first()[0].click();

            await new Promise(function (resolve) {
                setTimeout(resolve, 500)
            });

            var link = $('img[class=irc_mi]').attr('src')


            var resultsJson = [];

            resultsJson.push({
                "link": link

            })

            return resultsJson;


        });

        await browser.close();

        console.log('##############', dimensions);

        last_response.json(dimensions)


    })();
});


router.get('/download_mp3_v3', function (req, last_response, next) {


    let title = req.query.title;

    (async () => {
        const browser = await puppeteer.launch({
            headless: true
        });

        const page = await browser.newPage();
        await page.goto('https://www.mp3juices.cc/');
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})


        const dimensions = await page.evaluate(async (title) => {

            var resultsJson = [];

            $('#query').val(title)

            $('#button').trigger('click');

            await new Promise(function (resolve) {
                setTimeout(resolve, 1000)
            });

            $('#result_1').children().next().next().children()[0].click();


            await new Promise(function (resolve) {
                setTimeout(resolve, 2000)
            });


            var link = $('.url').attr('href');

            resultsJson.push({
                "link": link

            })

            return resultsJson;


        }, title);

        await browser.close();

        console.log('##############', dimensions);

        last_response.json(dimensions)


    })();

});



router.get('/download_mp3_v2', function (req, last_response, next) {

    var id;

    if (req.query.id == undefined) {
        id = '0hG_I8USKIc'
    } else {
        id = req.query.id;
    }


    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
            dumpio: true,
        });
        const page = await browser.newPage();
        await page.goto('https://youtubemp3api.com/@api/button/mp3/' + id);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {
            /* return {
             width: document.documentElement.clientWidth,
             height: document.documentElement.clientHeight,
             deviceScaleFactor: window.devicePixelRatio
             };*/

            await new Promise(function (resolve) {
                setTimeout(resolve, 2000)
            });

            var resultsJson = [];

            $('.download-result > .download-mp3-url').each(function () {
                var link = $(this).attr('href')

                resultsJson.push({
                    "link": link

                })

            });

            return resultsJson;


        });

        await browser.close();

        console.log('##############', dimensions);

        last_response.json(dimensions)


    })();
});


router.get('/download_mp4/', function (req, res, next) {
    var id = req.query.id;

    var video = youtubedl('https://www.youtube.com/watch?v=' + id,
        // Optional arguments passed to youtube-dl.
        ['--format=18'],
        // Additional options can be given for calling `child_process.execFile()`.
        {cwd: __dirname});

// Will be called when the download starts.

    video.on('info', function (info) {
        console.log('Download started');
        console.log('filename: ' + info._filename);
        console.log('size: ' + info.size);

        var fileName = info.filename;
        res.header('Content-Disposition', 'attachment; filename="' + info.size + ".mp4" + '"');
    });

    //video.pipe(fs.createWriteStream('x:/download2/myvideo.mp4'));

    //video.pipe(fs.createWriteStream(fileName))

    //video.get('remote_file_url').pipe(res);

    video.pipe(res);

    video.on('end', function () {
        //res.end({"status":"Completed"});
    });

});
router.get('/mp33/', function (req, res, next) {
    const fs = require('fs');
    const ytdl = require('ytdl-core');

    ytdl.getInfo('SGbH4esb4Ck', (err, info) => {
        if (err)
            throw err;

        //console.log('##############', info);

        var format = ytdl.chooseFormat(info.formats, {quality: '251'});
        if (format) {
            console.log('Format found!');

            ytdl('http://www.youtube.com/watch?v=SGbH4esb4Ck',{
                format : format
            }).pipe(res);

        }
    })



});


router.get('/download_mp3/', function (req, res, next) {
    var id = req.query.id;
    /*-t -f 5 --extract-audio*/

    /*format code  extension  resolution note
    139          m4a        audio only DASH audio   49k , m4a_dash container, mp4a.40.5@ 48k (22050Hz), 308.75KiB
    249          webm       audio only DASH audio   50k , opus @ 50k, 271.91KiB
    250          webm       audio only DASH audio   70k , opus @ 70k, 366.63KiB
    171          webm       audio only DASH audio  118k , vorbis@128k, 652.50KiB
    140          m4a        audio only DASH audio  127k , m4a_dash container, mp4a.40.2@128k (44100Hz), 820.00KiB
    251          webm       audio only DASH audio  130k , opus @160k, 705.84KiB
    160          mp4        256x144    DASH video  109k , avc1.4d400c, 13fps, video only, 703.64KiB
    278          webm       256x144    144p  111k , webm container, vp9, 25fps, video only, 439.72KiB
    242          webm       426x240    240p  243k , vp9, 25fps, video only, 623.95KiB
    133          mp4        426x240    DASH video  252k , avc1.4d4015, 25fps, video only, 1.54MiB
    134          mp4        640x360    DASH video  388k , avc1.4d401e, 25fps, video only, 1.24MiB
    243          webm       640x360    360p  458k , vp9, 25fps, video only, 1.19MiB
    135          mp4        854x480    DASH video  761k , avc1.4d401e, 25fps, video only, 2.40MiB
    244          webm       854x480    480p  893k , vp9, 25fps, video only, 2.00MiB
    136          mp4        1280x720   DASH video 1382k , avc1.4d401f, 25fps, video only, 4.56MiB
    247          webm       1280x720   720p 1754k , vp9, 25fps, video only, 3.94MiB
    137          mp4        1920x1080  DASH video 2350k , avc1.640028, 25fps, video only, 8.48MiB
    248          webm       1920x1080  1080p 2792k , vp9, 25fps, video only, 8.09MiB
    17           3gp        176x144    small , mp4v.20.3, mp4a.40.2@ 24k
    36           3gp        320x180    small , mp4v.20.3, mp4a.40.2
    43           webm       640x360    medium , vp8.0, vorbis@128k
    18           mp4        640x360    medium , avc1.42001E, mp4a.40.2@ 96k
    22           mp4        1280x720   hd720 , avc1.64001F, mp4a.40.2@192k (best)*/


    var video = youtubedl('https://www.youtube.com/watch?v=' + id,
        // Optional arguments passed to youtube-dl.

        ['-x', '--audio-format', 'mp3'],
        // Additional options can be given for calling `child_process.execFile()`.
        {cwd: __dirname});

// Will be called when the download starts.

    video.on('info', function (info) {
        console.log('Download started');
        console.log('filename: ' + info._filename);
        console.log('size: ' + info.size);

        var fileName = info.filename;
        res.header('Content-Disposition', 'attachment; filename="' + info._filename + ".mp3" + '"');
    });

    //video.pipe(fs.createWriteStream('x:/download2/myvideo.mp4'));

    //video.pipe(fs.createWriteStream(fileName))

    //video.get('remote_file_url').pipe(res);

    video.pipe(res);

    video.on('end', function () {
        //res.end({"status":"Completed"});
    });

});

router.get('/to_mp3_v2/', function (req, res, next) {

    var fs = require('fs');
    var ytdl = require('youtube-dl');

    var audio= ytdl.exec('SGbH4esb4Ck', ['-x', '--audio-format', 'mp3'], {}, function(err, output) {
        if (err) {
            throw err;
        }

        console.log(output.join('\n'));
    });


});


router.get('/to_mp3/', function (req, res, next) {


    var ffmpegPath = "";
    var id = req.query.id; // extra param from front end
    var title = ''; // extra param from front end

    if (req.query.title == undefined) {
        title = '__temp'
    } else {
        title = req.query.title;
    }


    var err; // Hoist the error variable declaration
    var proc;
    try {

        var url = 'https://www.youtube.com/watch?v=' + id;
        var stream;

        var err2;
        try {
            stream = youtubedl(url); //include youtbedl ... var youtubedl = require('ytdl');
        } catch (e) {
            err2 = e
            console.log('############## youtube stream error');
            console.log('##############', e);

            stream.close();
        }


        if (!err2) {
            ffmpegPath = 'C:/ffmpeg-20180227-fa0c9d6-win64-static/bin/ffmpeg.exe';

            //set response headers
            res.setHeader('Content-disposition', 'attachment; filename=' + title + '.mp3');
            res.setHeader('Content-type', 'audio/mpeg');

            //set stream for conversion
            proc = new ffmpeg({source: stream, nolog: false});

            //currently have ffmpeg stored directly on the server, and ffmpegLocation is the path to its location... perhaps not ideal, but what I'm currently settled on. And then sending output directly to response.
            proc.setFfmpegPath(ffmpegPath);
            proc.withAudioCodec('libmp3lame')
                .toFormat('mp3')
                .output(res)
                .run();
        }


    } catch (ex) {
        console.log('#####error--------->#####', ex);
        err = ex // Note here

    }

    if (!err) {
        proc.on('end', function () {
            console.log('finished');
        });
    }


});


module.exports = router;
