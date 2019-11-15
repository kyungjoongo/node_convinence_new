var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const cheerio = require('cheerio')
var syncrequest = require('sync-request');
const puppeteer = require('puppeteer');
var YoutubeMp3Downloader = require("youtube-mp3-downloader");
var youtubeStream = require('youtube-audio-stream')


router.get('/youtube_view/', function (req, res, next) {

    res.render('youtube_view', { id: '고경준 천재님이십니sdlkfsldkf' });

});


module.exports = router;