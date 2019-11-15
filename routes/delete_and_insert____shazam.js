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



     ,*/
    /*
     */
    /*

     */
    /*
     */

    /*



     */

    /*{
     chart_type: 'russia',
     url: 'https://www.shazam.com/charts/top-100/russia',
     },

     /

     /* */
    /*
     {
     chart_type: 'united-kingdom',
     url: 'https://www.shazam.com/charts/top-100/united-kingdom',
     },*/

    /*

     {
     chart_type: 'mexico',
     url: 'https://www.shazam.com/charts/top-100/mexico',
     },
     */
    /*
     {
     chart_type: 'japan',
     url: 'https://www.shazam.com/charts/top-100/japan',
     },*/
    /*
     {
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
     },*/


    /*{
     chart_type: 'argentina',
     url: 'https://www.shazam.com/charts/top-100/argentina'
     },*/

    /*
     */




    /* {
     chart_type: 'czech-republic',
     url: 'https://www.shazam.com/charts/top-100/czech-republic'
     },*/
    /*  {
     chart_type: 'singapore',
     url: 'https://www.shazam.com/charts/top-100/singapore'
     },*/

    /* {
     chart_type: 'taiwan',
     url: 'https://www.shazam.com/charts/top-100/taiwan'
     },
     {
     chart_type: 'bulgaria',
     url: 'https://www.shazam.com/charts/top-100/bulgaria'
     },
     {
     chart_type: 'netherlands',
     url: 'https://www.shazam.com/charts/top-100/netherlands'
     },*/
    /*

     {
     chart_type: 'saudi-arabia',
     url: 'https://www.shazam.com/charts/top-100/saudi-arabia'
     },




     {
     chart_type: 'south-africa',
     url: 'https://www.shazam.com/charts/top-100/south-africa'
     },


     {
     chart_type: 'venezuela',
     url: 'https://www.shazam.com/charts/top-100/venezuela'
     },
     */

    /* {

     */
    /*
     {
     chart_type: 'portugal',
     url: 'https://www.shazam.com/charts/top-100/portugal'
     },

     {
     chart_type: 'thailand',
     url: 'https://www.shazam.com/charts/top-100/thailand'
     },


     {
     chart_type: 'turkey',
     url: 'https://www.shazam.com/charts/top-100/turkey'
     },*/
    /*
     {
     chart_type: 'italy',
     url: 'https://www.shazam.com/charts/top-100/italy',
     },
     {
     chart_type: 'global',
     url: 'https://www.shazam.com/charts/top-100/world',
     },
     {
     chart_type: 'canada',
     url: 'https://www.shazam.com/charts/top-100/canada'
     },*/

    /*
     {
     chart_type: 'israel',
     url: 'https://www.shazam.com/charts/top-100/israel'
     },*/

    /*{
     chart_type: 'costa-rica',
     url: 'https://www.shazam.com/charts/top-100/costa-rica'
     },

     {
     chart_type: 'croatia',
     url: 'https://www.shazam.com/charts/top-100/croatia'
     },



     ,



     ,
     {
     chart_type: 'hungary',
     url: 'https://www.shazam.com/charts/top-100/hungary'
     }


     ,
     {
     chart_type: 'germany',
     url: 'https://www.shazam.com/charts/top-100/germany'
     }
     ,
     {
     chart_type: 'indonesia',
     url: 'https://www.shazam.com/charts/top-100/indonesia'
     }
     ,
     */

    /*{
     chart_type: 'switzerland',
     url: 'https://www.shazam.com/charts/top-100/switzerland'
     }


     ,
     {
     chart_type: 'ukraine',
     url: 'https://www.shazam.com/charts/top-100/ukraine'
     }
     ,
     {
     chart_type: 'peru',
     url: 'https://www.shazam.com/charts/top-100/peru'
     }


     ,
     ,
     {
     chart_type: 'ecuador',
     url: 'https://www.shazam.com/charts/top-100/ecuador'
     }

     ,
     */

    /*
     */
    /*{
     chart_type: 'south-korea',
     url: 'https://www.shazam.com/charts/top-100/south-korea'
     },

     {
     chart_type: 'france',
     url: 'https://www.shazam.com/charts/top-100/france'
     },

     {
     chart_type: 'germany',
     url: 'https://www.shazam.com/charts/top-100/germany'
     }

     ,
     {
     chart_type: 'greece',
     url: 'https://www.shazam.com/charts/top-100/greece'
     },*/

    /* {
     chart_type: 'poland',
     url: 'https://www.shazam.com/charts/top-100/poland'
     }

     ,
     {
     chart_type: 'romania',
     url: 'https://www.shazam.com/charts/top-100/romania'
     },
     {
     chart_type: 'kazakhstan',
     url: 'https://www.shazam.com/charts/top-100/kazakhstan'
     }
     ,
     {
     chart_type: 'malaysia',
     url: 'https://www.shazam.com/charts/top-100/malaysia'
     }*/

    /* {
     chart_type: 'new-zealand',
     url: 'https://www.shazam.com/charts/top-100/new-zealand'
     }


     ,
     {
     chart_type: 'norway',
     url: 'https://www.shazam.com/charts/top-100/norway'
     },
     {
     chart_type: 'sweden',
     url: 'https://www.shazam.com/charts/top-100/sweden'
     },

     {
     chart_type: 'denmark',
     url: 'https://www.shazam.com/charts/top-100/denmark'
     }*/

    /*,


     {
     chart_type: 'world',
     url: 'https://www.shazam.com/charts/top-100/world',
     },

     {
     chart_type: 'usa',
     url: 'https://www.shazam.com/charts/top-100/united-states'

     }*/



    /* {
     chart_type: 'argentina',
     url: 'https://www.shazam.com/charts/top-100/argentina'
     },*/

    /*{
     chart_type: 'austria',
     url: 'https://www.shazam.com/charts/top-100/austria'
     },

     {
     chart_type: 'australia',
     url: 'https://www.shazam.com/charts/top-100/australia',
     },*/

    /*{
        chart_type: 'bulgaria',
        url: 'https://www.shazam.com/charts/top-100/bulgaria'
    },
    {
        chart_type: 'usa',
        url: 'https://www.shazam.com/charts/top-100/united-states'
    },
*/
   /* {
        chart_type: 'colombia',
        url: 'https://www.shazam.com/charts/top-100/colombia'
    },


    {
        chart_type: 'japan',
        url: 'https://www.shazam.com/charts/top-100/japan',
    },*/

   /* {
        chart_type: 'canada',
        url: 'https://www.shazam.com/charts/top-100/canada'
    },*/

    {
        chart_type: 'india',
        url: 'https://www.shazam.com/charts/top-100/india',
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

        await db.exec('delete  from music_chart.top100_charts   where chart_type=\'' + chart_type + ' \'', {}).then(rows => {
            console.log('##############', rows);
        });
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








