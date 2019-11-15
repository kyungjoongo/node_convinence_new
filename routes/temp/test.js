
const cheerio = require('cheerio')

var request = require("request");

var startDate = '20180301';
var endDate = '20180308';
var baseUri = 'http://www.melon.com/chart/week/index.htm?classCd=GN0900#params%5Bidx%5D=1&params%5BisFirstDate%5D=false&params%5BisLastDate%5D=true'
    + '&params[startDay]=' + startDate + '&params[endDay]=' + endDate;

request({url: baseUri, method: 'GET'}, function (error, res, body) {
    var resultArray = [];

    $ = cheerio.load(body);
    $('.service_list_song > table > tbody > tr').each(function () {

        var rank = $(this).find('td:nth-child(2)').text().replace('\n\t', '');
        var image = $(this).find('td:nth-child(4)').children().children().children().attr('src');
        var singer = $(this).find('td:nth-child(6)').children().children().children().next().next().children().children().text();
        var song_name = $(this).find('td:nth-child(6)').children().children().children().children().children().text().replace(singer, '');

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

    console.log('live--->',resultArray);

});


