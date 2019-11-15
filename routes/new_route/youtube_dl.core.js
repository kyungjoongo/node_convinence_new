const fs = require('fs');
const ytdl = require('ytdl-core');

ytdl.getInfo('SGbH4esb4Ck', (err, info) => {
    if (err)
        throw err;

    //console.log('##############', info);

    var format = ytdl.chooseFormat(info.formats, {quality: '251'});
    if (format) {
        console.log('Format found!');
    }
})


ytdl('http://www.youtube.com/watch?v=SGbH4esb4Ck').pipe(fs.createWriteStream('asdsadasd.flv'));
