
var fs = require('fs');
var youtubedl = require('youtube-dl');
var ffmpeg = require('fluent-ffmpeg');

/*


var exec = require('child_process').execFile;

var fun =function(){
    console.log("fun() start");
    exec('youtube-dl.exe ',[' https://www.youtube.com/watch?v=ivPEKaBHjYA --format 18 -g'] ,function(err, data) {
        console.log(err)
        console.log(data.toString());
    });
}
fun();*/

/*

const exec = require('child_process').exec;
exec('youtube-dl  https://www.youtube.com/watch?v=ivPEKaBHjYA --format 18 -g', (e, stdout, stderr)=> {
    if (e instanceof Error) {
        console.error(e);
        throw e;
    }
    console.log('stdout ', stdout);
    console.log('stderr ', stderr);
});
*/


var spawn = require('child_process').spawn,
    ls    = spawn('youtube-dl', ['https://www.youtube.com/watch?v=gslVDBS0VeI ', '-g']);

let result= ''

let i=0;
ls.stdout.on('data', function (data) {
    if ( i==1){
        console.log('stdout: ' + data.toString());
        result = data.toString();
    }

    i++;
});



ls.on('exit', function (code) {
    console.log('child process exited with code ' + code.toString());

    console.log('#######result222#######'+ result)

});

