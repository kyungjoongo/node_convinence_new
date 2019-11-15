var request = require("request");
var cheerio = require("cheerio");
var fetch = require("node-fetch");
const {forEach} = require('p-iteration');
const puppeteer = require('puppeteer');
const mysql = require('nodejs-mysql').default;
const config = {
    host: 'gazua.kyungjoongo.site',
    port: 3306,
    user: 'root',
    password: '1114',
    database: 'test'
}
const db = mysql.getInstance(config)

process.setMaxListeners(Infinity);

let urls = [

    {
        chart_type: 'pop',
        url: 'https://www.shazam.com/charts/pop/global'
    },

    {
        chart_type: 'dance',
        url: 'https://www.shazam.com/charts/dance/global'
    },

    {
        chart_type: 'hip-hop',
        url: 'https://www.shazam.com/charts/hip-hop/global'
    },

    {
        chart_type: 'country',
        url: 'https://www.shazam.com/charts/country/global'
    },

    {
        chart_type: 'latin',
        url: 'https://www.shazam.com/charts/latin/united-states'
    },


]

forEach(urls, async (elementOne) => {
    await insertTop100Chart(elementOne.url, elementOne.chart_type)

});


async function insertTop100Chart(pUrl, chart_type) {


    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--window-size=1920x1080'],

        });
        const page = await browser.newPage();
        //let url = 'https://www.shazam.com/charts/top-100/united-states'
        //let url = 'https://www.shazam.com/charts/top-100/south-korea'
        // let url = 'https://www.shazam.com/charts/top-100/united-states'
        //https://www.shazam.com/charts/pop/global
        let url = pUrl;

        await page.goto(url);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
        const dimensions = await page.evaluate(async () => {
            await new Promise(function (resolve) {
                setTimeout(resolve, 1000 * 5)
            });
            /!*$("html, body").animate({ scrollTop: $(document).height() }, 3000);*!/
            window.scrollTo(0, document.body.scrollHeight);
            await new Promise(function (resolve) {
                setTimeout(resolve, 5000)
            });


            var resultsJson = [];


            $('.inner-content > .charttracks > ul  > li ').each(function () {

                var rank = $(this).find('.number').text();
                var song_name = $(this).find('.title').children().next().text();
                var singer = $(this).find('.artist').children().next().text();
                var image = $(this).find('.image ').children().attr('src');
                var audio = $(this).find('meta[itemprop="audio"]').attr('content');

                resultsJson.push({
                    rank: rank,
                    song_name: song_name,
                    singer: singer,
                    image: image,
                    audio: audio,


                })


            });


            return resultsJson;


        });

        await browser.close();

        console.log('##############', dimensions);
        console.log('##############', dimensions.leng);

        await db.exec('delete  from music_chart.top10_by_genre   where chart_type=\'' + chart_type + ' \'', {}).then(rows => {
            console.log('##############', rows);
        });

        forEach(dimensions, async (dimensionsOne) => {
            await db.exec('insert into music_chart.top10_by_genre set ?', {
                chart_type: chart_type,
                rank: dimensionsOne.rank,
                song_name: dimensionsOne.song_name,
                singer: dimensionsOne.singer,
                image: dimensionsOne.image,
                audio: dimensionsOne.audio,

            }).then(rows => {

                console.log('###########good' + JSON.stringify(rows));
            })

        });


    })();

}








