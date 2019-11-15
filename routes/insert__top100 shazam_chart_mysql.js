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

/*
   */
/*
    {
        chart_type: 'canada',
        url: 'https://www.shazam.com/charts/top-100/canada'
    },


    {
        chart_type: 'italy',
        url: 'https://www.shazam.com/charts/top-100/italy',
    },
    {
        chart_type: 'global',
        url: 'https://www.shazam.com/charts/top-100/world',
    },*/

    /*{
        chart_type: 'russia',
        url: 'https://www.shazam.com/charts/top-100/russia',
    },
    {
        chart_type: 'australia',
        url: 'https://www.shazam.com/charts/top-100/australia',
    },
    {
        chart_type: 'japan',
        url: 'https://www.shazam.com/charts/top-100/japan',
    },
    {
        chart_type: 'united-kingdom',
        url: 'https://www.shazam.com/charts/top-100/united-kingdom',
    },
*/
/*
    {
        chart_type: 'india',
        url: 'https://www.shazam.com/charts/top-100/india',
    },
    {
        chart_type: 'mexico',
        url: 'https://www.shazam.com/charts/top-100/mexico',
    },
    {
        chart_type: 'world',
        url: 'https://www.shazam.com/charts/top-100/world',
    },

    {
        chart_type: 'usa',
        url: 'https://www.shazam.com/charts/top-100/united-states'
    },*/
   /* {
        chart_type: 'finland',
        url: 'https://www.shazam.com/charts/top-100/finland'
    },

    {
        chart_type: 'china',
        url: 'https://www.shazam.com/charts/top-100/china'
    },
    {
        chart_type: 'ireland',
        url: 'https://www.shazam.com/charts/top-100/ireland'
    },
*/
    /*

    */
/*
    */

  /*  {
        chart_type: 'austria',
        url: 'https://www.shazam.com/charts/top-100/austria'
    },
    {
        chart_type: 'argentina',
        url: 'https://www.shazam.com/charts/top-100/argentina'
    },*/

   /* {
        chart_type: 'usa',
        url: 'https://www.shazam.com/charts/top-100/united-states'
    },*/

    {
        chart_type: 'south-korea',
        url: 'https://www.shazam.com/charts/top-100/south-korea'
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
                setTimeout(resolve, 2500)
            });
            /*$("html, body").animate({ scrollTop: $(document).height() }, 3000);*/
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

        forEach(dimensions, async (dimensionsOne) => {
            await db.exec('insert into music_chart.top100_charts set ?', {
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








