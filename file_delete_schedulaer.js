var schedule = require('node-schedule');

/*var j = schedule.scheduleJob('* * * ? * *', function(){
    console.log('The answer to life, the universe, and everything!');
});*/



const fs = require('fs');
const path = require('path');

const directory = './images';

fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
        });
    }
});
