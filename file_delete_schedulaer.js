var schedule = require('node-schedule');

var j = schedule.scheduleJob('45 * * * *', function(){
    const fs = require('fs');
    const path = require('path');

    let directory = './images';

    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
    });

    directory = './public/images';

    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
    });

    console.log('osdkfdokf=====>delete')
});




