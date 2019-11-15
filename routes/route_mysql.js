var express = require('express');
var router = express.Router();
var beautify = require("json-beautify");
var cheerio = require('cheerio');
var request = require('request');
var syncRequest = require('sync-request');
var querystring = require('querystring');
var striptags = require('striptags');
var prettyjson = require('prettyjson');

const mysql = require('nodejs-mysql').default;
const config = {
    host: 'gazua.kyungjoongo.site',
    port: 3306,
    user: 'root',
    password: '1114',
    database: 'music_chart'
}
const connection = mysql.getInstance(config)


router.get('/get_shazam_top100', function (req, last_response, next) {


    var chart_type = '';

    if ( req.query.chart_type != undefined){
        chart_type = req.query.chart_type
    }else{
        chart_type= 'korea'
    }

    sql = "select * from music_chart.top100_charts where chart_type='"+ chart_type+ "' order by rank asc";


    connection.exec(sql).then(rows => {

        last_response.json(rows)

    });
});



router.get('/get_shazam_top10_by_genre', function (req, last_response, next) {

    var chart_type = '';

    if ( req.query.chart_type != undefined){
        chart_type = req.query.chart_type
    }else{
        chart_type= 'dance'
    }

    sql = "select * from music_chart.top10_by_genre where chart_type='"+ chart_type+ "' order by rank asc";


    connection.exec(sql).then(rows => {

        last_response.json(rows)

    });
});


router.get('/get_shazam_top100_2', function (req, last_response, next) {


    var chart_type = '';

    if ( req.query.chart_type != undefined){
        chart_type = req.query.chart_type
    }else{
        chart_type= 'korea'
    }

    sql = "select * from music_chart.top100_charts where chart_type='"+ chart_type+ "' order by rank asc";


    connection.exec(sql).then(rows => {

        let result ={
            result: rows,
        }

        last_response.json(result)

    });
});





router.get('/get_shazam_chart_type', function (req, last_response, next) {

    sql = "select distinct chart_type as text from music_chart.top100_charts order by text asc";

    connection.exec(sql).then(rows => {

        last_response.json(rows)

    });
});




router.get('/get_seven11', function (req, last_response, next) {


    var type = req.query.type;

    if ( type=='1'){
        type= '1+1'
    }else if (type=='2'){
        type= '2+1'
    }

    /*var table_name = 'humor001'
    var offset = (page - 1) * 20;*/


    let sql = ''

    sql = "select * from seven11products where type='"+ type+ "'";


    connection.exec(sql).then(rows => {

        last_response.json(rows)

    });
});




module.exports = router;
