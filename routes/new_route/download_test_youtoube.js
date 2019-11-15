var fs = require('fs');
var youtubedl = require('youtube-dl');
var ffmpeg = require('fluent-ffmpeg');

var video = youtubedl('https://www.youtube.com/watch?v=rjINNeC0DFA'
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
