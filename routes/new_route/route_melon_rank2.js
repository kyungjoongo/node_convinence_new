var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const cheerio = require('cheerio')
var syncrequest = require('sync-request');


router.get('/melon_rank_v2/', function (req, last_response, next) {


    var genre = req.query.genre;

    var startDate = getDateTime(-6)
    var endDate = getDateTime(0);

    console.log('######startDate########' + startDate);
    console.log('######endDate########' + endDate);

    /* http://www.melon.com/chart/week/index.htm?classCd=GN1500#params%5Bidx%5D=1&params%5BstartDay%5D=20180305&params%5BendDay%5D=20180311&params%5BisFirstDate%5D=false&params%5BisLastDate%5D=true*/

    /*http://www.melon.com/chart/week/index.htm?classCd=GN1700#params%5Bidx%5D=1&params%5BstartDay%5D=20180305&params%5BendDay%5D=20180311&params%5BisFirstDate%5D=false&params%5BisLastDate%5D=true*/

    var classCd = ''
    if (genre == 'jazz') {
        classCd = 'GN1700';
    }

    if (genre == 'rock_metal') {
        classCd = 'GN1000';
    }



    if (genre == 'ost') {
        classCd = 'GN1500';
    }

    //GN1900 -JPOP
    if (genre == 'jpop') {
        classCd = 'GN1900';
    }

    //GN2000 월드뮤직
    if (genre == 'worldmusic') {
        classCd = 'GN2000';
    }

    //GN1400 포크/블루스/컨트리
    if (genre == 'fork') {
        classCd = 'GN1400';
    }

    //GN1000 락/메탈
    if (genre == 'rock') {
        classCd = 'GN1000';
    }

    //GN1200 랩/힙함
    if (genre == 'rap') {
        classCd = 'GN1200';
    }

    //GN0400 RNS/소울
    if (genre == 'rnb') {
        classCd = 'GN1300';
    }

    //GN0900 팝/해외
    if (genre == 'pop') {
        classCd = 'GN0900';
    }

    //DM0000 KPOP종합
    if (genre == 'kpop') {
        classCd = 'DM0000';
    }

    //GN1100 일레트로니카
    if (genre == 'eletronica') {
        classCd = 'GN1100';
    }

    //씨씨엠
    if (genre == 'ccm') {
        classCd = 'GN2100'
    }

    if ( genre=='fork_country'){
        classCd = 'GN1400'
    }


    var baseUri = 'http://www.melon.com/chart/week/index.htm?classCd=' + classCd + '#params%5Bidx%5D=1&params%5BisFirstDate%5D=false&params%5BisLastDate%5D=true'
        + '&params[startDay]=' + startDate + '&params[endDay]=' + endDate;


    var res = syncrequest('GET', baseUri);
    var beautify = require("json-beautify");

    var resultArray = [];

    console.log(res.getBody());

//noinspection JSAnnotator
    $ = cheerio.load(res.getBody());

    $('.service_list_song > table > tbody > tr').each(function () {

        var rank = $(this).find('td:nth-child(2)').text().replace('\n\t', '').replace('위', '');
        rank = "#" + rank
        var image = $(this).find('td:nth-child(4)').children().children().children().attr('src');
        var singer = $(this).find('td:nth-child(6)').children().find('.rank02').children().attr('title').replace(' - 페이지 이동', '')
        /*var singer2 = $(this).find('td:nth-child(6)').children().find('.rank02').children().hasN.attr('title').replace(' - 페이지 이동', '')*/
        var song_name = $(this).find('td:nth-child(6)').children().children().children().children().children().attr('title')
        if(song_name !=undefined){
            song_name = song_name.replace('재생', '');
        }

        var song_name2 = $(this).find('td:nth-child(6)').children().children().children().children().children().next().html();

        /* if ( singer2 !=null){
         singer = singer + ", "+ singer2
         }*/

        if (song_name == '19세 미만 청소년 이용불가') {
            song_name = song_name2;
        }



        var album_name = $(this).find('td:nth-child(7)').children().children().children().children().attr('title').replace('- 페이지 이동', '');

        var result = {
            rank: rank,
            image: image,
            song_name: song_name,
            singer: singer,
            album_name: album_name
        }

        resultArray.push(result)

    });


    console.log('##############', resultArray);

    last_response.json(resultArray);

});

function getDateTime(prevDay) {

    var date = new Date();

    if (prevDay != 0) {

        date.setDate(date.getDate() + prevDay);
    }


    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + month + day;

}

module.exports = router;
