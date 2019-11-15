var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const cheerio = require('cheerio')
var syncrequest = require('sync-request');
const puppeteer = require('puppeteer');
var beautify = require("json-beautify");
var Iconv1 = require('iconv').Iconv;
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBJ5grchLpTqAzod7NoAlf7YFwHdS2LIeU",
    authDomain: "rich-labs-app.firebaseapp.com",
    databaseURL: "https://rich-labs-app.firebaseio.com",
    projectId: "rich-labs-app",
    storageBucket: "",
    messagingSenderId: "410276199004"
};
var firebase = firebase.initializeApp(config);


const dbRef = firebase.database().ref();
const usersRef = dbRef.child('users');


router.get('/test001', function (req, res, next) {

    var id = 'sdlkflskdlfdsflksdlfk'

    res.render('test001', {id: id});
});

router.post('/insert001', function (req, res, next) {

    var name = req.body.name;
    var age = req.body.age;

    usersRef.push({
        'name': name,
        'age': age,

    }, (err) => {
        console.log(err);
    })

    console.log('live--->' + name);
    console.log('age--->' + age);

    res.render('test001', {});
});


router.get('/getList', (req, res, next) => {

    let arrResults = [];

    usersRef.on("child_added", snap => {
        let user = snap.val();

        console.log('key--->',snap.key);
        console.log('key--->',snap.val().age);

        let itemOne = {
            'age' : snap.val().age,
            'name' : snap.val().name,
            'id' : snap.key,
        }

        arrResults.push(itemOne);
    });

    console.log('arrResults--->',arrResults);

    res.json(arrResults.sort().reverse())

})


module.exports = router;
