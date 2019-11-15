var express = require('express');

const fileUpload = require('express-fileupload');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var route_dr_apt_best_bunyang = require('./routes/new_route/route_dr_apt_best_bunyang');
var route_imde2 = require('./routes/new_route/route_imde2');
var route_comics = require('./routes/new_route/route_comics');
var route_mysql = require('./routes/route_mysql');
var route_youtube_music_rank = require('./routes/route_youtube_music_rank');
var route_naver_dic = require('./routes/route_naver_dic');
var route_face_reconize = require('./routes/route_face_reconize');
//route_mp3_download
var route_mp3_download = require('./routes/new_route/route_mp3_download');
var route_melon_rank = require('./routes/new_route/route_melon_rank');
var route_melon_rank2 = require('./routes/new_route/route_melon_rank2');
var route_convenience = require('./routes/new_route/route_convenience');
var route_billboard_rank = require('./routes/new_route/route_billboard_rank');
var route_dr_apt = require('./routes/new_route/route_dr_apt');
var route_apt2you = require('./routes/new_route/route_apt2you');



var route_google_face_reconize = require('./routes/route_google_face_reconize');
var cors = require('cors')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors())

app.use(fileUpload());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/', route_youtube_music_rank)

//route_dr_apt_best_bunyang
app.use('/', route_dr_apt_best_bunyang)
app.use('/', route_dr_apt)
app.use('/', route_apt2you)
////////////////////
app.use('/', route_melon_rank)
app.use('/', route_melon_rank2)
app.use('/', route_comics)
//route_imde2
app.use('/', route_imde2)
app.use('/', route_mp3_download)
app.use('/', route_convenience)
app.use('/', route_billboard_rank)

app.use('/', route_face_reconize);

app.use('/', route_google_face_reconize);

app.use('/', route_mysql);
app.use('/', route_melon_rank);
app.use('/users', users);
app.use('/', route_naver_dic);
//route_mp3_download
app.use('/', route_mp3_download);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


var debug = require('debug')('mp3-downloader:server');
var http = require('http');

/**##############################################################################################
 * portportportportportportportportportportportportportportportportportportportportportportportport
 ##############################################################################################*/

var port = normalizePort(process.env.PORT || '1234');
app.set('port', port);


/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(process.env.PORT || 1234, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

server.on('listening',
    function onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }
);


server.on('error', error => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}


module.exports = app;
