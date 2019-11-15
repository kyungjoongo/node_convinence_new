var express = require('express');
var querystring = require('querystring');
var router = express.Router();
var beautify = require("json-beautify");
var cheerio = require('cheerio');
var request = require('request');
var striptags = require('striptags');
var prettyjson = require('prettyjson');
var fs = require('fs');
var youtubedl = require('youtube-dl');
var ffmpeg = require('fluent-ffmpeg');
var btc = require('better-try-catch')
const puppeteer = require('puppeteer');
var syncRequest = require('sync-request');

router.get('/mp3_juice', function (req, last_response, next) {


    let query = '';
    if (req.query.q == undefined) {
        query = 'pink trauma'
    } else {
        query = req.query.q
    }

    (async () => {
        const browser = await puppeteer.launch({
            headless: true

        });
        const page = await browser.newPage();
        await page.goto('https://www.mp3juices.cc/');
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        //let query='goo goo dols slide'

        const dimensions = await page.evaluate(async (query) => {

            await new Promise(function (resolve) {
                setTimeout(resolve, 1000)
            });

            $('#query').val(query);


            await new Promise(function (resolve) {
                setTimeout(resolve, 300)
            });


            $('#button').trigger('click');

            await new Promise(function (resolve) {
                setTimeout(resolve, 700)
            });


            $('.download')[0].click();

            await new Promise(function (resolve) {
                setTimeout(resolve, 2000)
            });


            var resultsJson= $('#download_1').children().next().next().children().attr('href');


            return resultsJson;

        }, query);


        /*await browser.close();*/

        console.log('##############', dimensions);

        last_response.json({
            download_url: dimensions,
        })


    })();

});


router.get('/get_audio2', function (req, last_response, next) {


    var ytdl = require('ytdl-core')

    let _videoId = '';
    if (req.query.videoId == undefined) {
        _videoId = 'oBB1SIg2MdI'
    } else {
        _videoId = req.query.videoId
    }

    let uri = 'http://youtube.com/watch?v=' + _videoId;

    ytdl.getInfo(uri, {
        //videoFormat: 'mp4',
        quality: 'lowest',
        audioFormat: 'mp3',
    }, (err, info) => {

        /*console.log('live--->',info.formats);*/

        console.log('live--->', info.formats.length)

        let _result=info.formats;

        let _url='';
        _result.forEach(item=>{

            if (item.audioBitrate=='128' && item.container=='m4a'){

                console.log('live--->',item);
                //console.log('live--->',item.url);

                _url= item.url;
            }
        })
      /*  console.log('live--->', info.formats.length);

        console.log('live--->', info.formats[17]);

        let videoUrl = info.formats[17].url


        //console.log('live--->',videoUrl);

        */

        last_response.json({
            videoUrl: _url,
        })
    })

});


function getClientIp(req) {
    var ipAddress;
    // The request may be forwarded from local web server.
    var forwardedIpsStr = req.header('x-forwarded-for');
    if (forwardedIpsStr) {
        // 'x-forwarded-for' header may return multiple IP addresses in
        // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
        // the first one
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
        // If request was not forwarded
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
};

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

router.get('/get_audio', function (req, last_response, next) {

    let _videoId = '';
    if (req.query.videoId == undefined) {
        _videoId = 'oBB1SIg2MdI'
    } else {
        _videoId = req.query.videoId
    }

    const youtubeStream = require('youtube-audio-stream')
    /*
    const url = 'http://youtube.com/watch?v=oBB1SIg2MdI'*/
    var requestUrl = 'http://youtube.com/watch?v=' + _videoId
    try {
        youtubeStream(requestUrl).pipe(last_response)
    } catch (exception) {
        last_response.status(500).send(exception)
    }

});

router.get('/get_audio002', function (req, last_response, next) {

    let _videoId = '';
    if (req.query.videoId == undefined) {
        _videoId = 'oBB1SIg2MdI'
    } else {
        _videoId = req.query.videoId
    }

    const youtubeStream = require('youtube-audio-stream')
    /*
    const url = 'http://youtube.com/watch?v=oBB1SIg2MdI'*/
    var requestUrl = 'http://youtube.com/watch?v=' + _videoId
    try {
        youtubeStream(requestUrl).pipe(last_response)
    } catch (exception) {
        last_response.status(500).send(exception)
    }

});


router.get('/mp3_new2', function (req, last_response, next) {
    var id;

    if (req.query.id === undefined) {
        id = '0hG_I8USKIc'
    } else {
        id = req.query.id;
    }


    (async () => {


        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-gpu',
            ],
            /*args: [],*/
            dumpio: true,
        });


        const page = await browser.newPage();
        await page.goto('http://localhost:4000/?id=' + id);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const __page = await page.evaluate(async () => {
            /*  await new Promise(function (resolve) {
             setTimeout(resolve, 2000)
             });*/
            let resultsJson = [];

            let result = ($("iframe").attr('src'));


            return result;
        });


        console.log('########1111111111######', __page);


        await page.goto(__page);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const __page3 = await page.evaluate(async () => {

            let result = ($("iframe").attr('src'));


            return result;
        });

        console.log('########2222222222222222######', 'http:' + __page3);

        await page.goto('http:' + __page3);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {


            $("#download-audio").trigger('click')

            await new Promise(function (resolve) {
                setTimeout(resolve, 1000)
            });

            let href = $("#file").attr('href');

            return href;
        });


        console.log('##############', dimensions);

        let finalArray = []

        let temp = {
            link: dimensions,
        }

        finalArray.push(temp);
        finalArray.push(temp);
        finalArray.push(temp);
        finalArray.push(temp);

        browser.close()
        console.log('##############', finalArray);
        last_response.json(finalArray)

    })();

});


router.get('/mp3_new', function (req, last_response, next) {

    var id;

    if (req.query.id === undefined) {
        id = '0hG_I8USKIc'
    } else {
        id = req.query.id;
    }


    (async () => {


        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-gpu',
                '--ignore-certificate-errors',
            ],
            /*args: [],*/
            dumpio: true,
        });


        const page = await browser.newPage();
        await page.goto('http://www.mp3juices.cc/'
        );
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

//    ;

        const dimensions = await page.evaluate(async (id) => {
            /*await new Promise(function (resolve) {
             setTimeout(resolve, 1000)
             });*/

            console.log('##############' + id);

            let resultsJson = [];

            $("#query").val(id)

            $("#button").trigger('click');

            return resultsJson;

        }, id);


        await page.waitFor('.result').then(async () => {
            page.evaluate(() => {
                let resultList = [];


                $('a[class="download 1"]')[0].click()


                return resultList;
            }).then(async () => {

                let dimensions = await page.waitFor('.url').then(async () => {
                    let result = await page.evaluate(async () => {
                        let resultList = [];

                        /*alert($("div[class='file margin']").find('.url').attr('href'));*/
                        await new Promise(function (resolve) {
                            setTimeout(resolve, 3000)
                        });
                        let _rsult = $(".url").attr('href');

                        /*console.log('##############', _rsult);*/

                        //  alert(_rsult);


                        return _rsult;
                    }).then((searchResult) => {
                        console.log(searchResult)
                        //browser.close();

                        return searchResult;
                    });

                    return result;
                })

                let finalArray = []

                let temp = {
                    link: dimensions,
                }

                finalArray.push(temp);
                finalArray.push(temp);
                finalArray.push(temp);
                finalArray.push(temp);

                browser.close()
                console.log('##############', finalArray);
                last_response.json(finalArray)
            })
        })

    })();
});


router.get('/apple_top100', function (req, last_response, next) {
    var id;

    if (req.query.id === undefined) {
        id = '0hG_I8USKIc'
    } else {
        id = req.query.id;
    }


    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--window-size=1920x1080'],

        });
        const page = await browser.newPage();
        let url = 'https://www.apple.com/itunes/charts/songs/';

        await page.goto(url);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
        const dimensions = await page.evaluate(async () => {

            var resultsJson = [];


            $('.section-content  > ul  > li ').each(function () {

                var rank = $(this).find('strong').text();
                var img = $(this).find('img').attr('src')
                var title = $(this).find('img').attr('alt')
                var singer = $(this).find('h4').children().text();


                resultsJson.push({
                    rank: rank,
                    image: 'http://www.apple.com' + img,
                    song_name: title,
                    singer: singer,


                })


            });


            return resultsJson;


        });

        await browser.close();
        console.log('##############', dimensions);
        last_response.json(dimensions)

    })();


});


router.get('/mp3_fast', function (req, last_response, next) {

    var id;

    if (req.query.id === undefined) {
        id = '0hG_I8USKIc'
    } else {
        id = req.query.id;
    }


    (async () => {

        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        const proxyChain = require('proxy-chain');

        //const oldProxyUrl = 'http://bob:password123@35.199.78.142:80';
        let proxys = [
            '121.164.89.97:808',
        ]


        ///////////////
        let randNo = randomIntFromInterval(0, proxys.length - 1);

        const oldProxyUrl = 'http://' + proxys[randNo];
        console.log('oldProxyUrl--->', oldProxyUrl);

        const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

        // Prints something like "http://127.0.0.1:45678"
        console.log('newProxyUrl--->', newProxyUrl);

        const browser = await puppeteer.launch({
            headless: false,
            args: [
                `--proxy-server=${newProxyUrl}`,
                '--no-sandbox',
            ],
            dumpio: true,
            ignoreHTTPSErrors: true
        });


/////////////////////////////////////////////////////////////////////////
        const page = await browser.newPage();
        await page.goto('https://www.convertmp3.io/widget/button/?video=https://www.youtube.com/watch?color=397818&v=8MPbR6Cbwi4', {});
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {
            await new Promise(function (resolve) {
                setTimeout(resolve, 1000)
            });


            let result = [];


            let href = $("#downloadButton").attr('href')


            link = "https://www.convertmp3.io" + href;


            result.push({
                link: link,
            })

            result.push({
                link: link,
            })

            result.push({
                link: link,
            })

            result.push({
                link: link,
            })

            return result;

        });

        await browser.close();
        console.log('##############', dimensions);
        last_response.json(dimensions)


    })();
});


router.get('/convert_mp3_192', function (req, last_response, next) {

    var id;

    if (req.query.id == undefined) {
        id = '0hG_I8USKIc'
    } else {
        id = req.query.id;
    }


    (async () => {

        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-gpu',
            ],
            /*args: [],*/
            dumpio: true,
        });


        const page = await browser.newPage();
        await page.goto('https://www.convertmp3.io/widget/button/?video=https://www.youtube.com/watch?v=' + id + '&color=397818');
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        await page.waitForSelector('#downloadButton');

        const dimensions = await page.evaluate(async () => {

            let result = [];
            let __pureLInk = $("#downloadButton").attr('href')

            let link = 'https://www.convertmp3.io' + __pureLInk

            result.push({
                link: link,
            })

            result.push({
                link: link,
            })

            result.push({
                link: link,
            })

            result.push({
                link: link,
            })

            return result;

        });

        await browser.close();
        console.log('##############', dimensions);
        last_response.json(dimensions)


    })();

});


router.get('/mp3_download_mpgun', function (req, last_response, next) {

    var id;

    if (req.query.id == undefined) {
        id = '0hG_I8USKIc'
    } else {
        id = req.query.id;
    }

    (async () => {
        const proxyChain = require('proxy-chain');

        //const oldProxyUrl = 'http://bob:password123@35.199.78.142:80';
        let proxys = [
            '47.206.51.67:8080',
            '47.206.51.67:8080',
            /*  '104.238.146.146:8123',
             '45.55.134.204:3128',
             '65.61.106.131:8080',
             '45.77.95.158:8170',
             '104.152.188.251:80',*/
        ]


        let randNo = randomIntFromInterval(0, proxys.length - 1);

        const oldProxyUrl = 'http://bob:password123@' + proxys[randNo];

        console.log('oldProxyUrl--->', oldProxyUrl);
        const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

        // Prints something like "http://127.0.0.1:45678"
        console.log(newProxyUrl);

        const browser = await puppeteer.launch({
            headless: true,
            args: [
                `--proxy-server=${newProxyUrl}`,
                '--no-sandbox',
                '--disable-gpu',
                '--window-size=1920x1080'],
            /*args: [],*/
            dumpio: true,
        });


        const page = await browser.newPage();
        await page.goto('https://mpgun.com/youtube-to-mp3.html?title=skdf8723478&yid=' + '0hG_I8USKIc');
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})


        const dimensions = await page.evaluate(async () => {
            await new Promise(function (resolve) {
                setTimeout(resolve, 1000)
            });


            let result = [];

            let link = $(".downloadblock").children().attr('href');


            /*$("#submitForm").trigger("click");

             await page.waitForSelector('a[class="button green-bg icon-right"]');*/

            result.push({
                link: link,
            })

            result.push({
                link: link,
            })

            result.push({
                link: link,
            })

            result.push({
                link: link,
            })

            return result;

        });

        await browser.close();
        console.log('##############', dimensions);
        last_response.json(dimensions)

    })();

});


router.get('/mp3_download_v20', function (req, last_response, next) {

    var id;

    if (req.query.id == undefined) {
        id = '0hG_I8USKIc'
    } else {
        id = req.query.id;
    }

    let clientIp = getClientIp(req);


    clientIp = clientIp.toString().replace('::ffff:', '');
    console.log('clientIp', clientIp);


    // let url= 'http://api.recordmp3.co/fetch?zz=p&apikey=recordmp3.co&t=1526335801&h=b927f7405319da59b49266e8bba6a47e2f206850&v='+ id

    let url = 'http://api.recordmp3.co/fetch?zz=p&apikey=recordmp3.co&t=1526335801&h=b927f7405319da59b49266e8bba6a47e2f206850&v=' + id

    request({url: url, method: 'GET'}, function (error, response, body) {


        console.log('clientIp', clientIp);

        let resultsJson = [];

        let json = JSON.parse(body);

        console.log('', "http:" + json.url);

        let url = "http:" + json.url;
        //loca210.90.237.97

        console.log('##############', url);


        let arrays = url.split('&ip');

        let ___tempPostFixUrlString = arrays[1].split('&cu=')

        ___tempPostFixUrlString[0] = '=' + '45.119.145.8'

        let postFixUrl = '&ip' + ___tempPostFixUrlString[0] + ___tempPostFixUrlString[1]

        let completeUlr = arrays[0] + postFixUrl;


        resultsJson.push({
            "link": completeUlr,
        })
        resultsJson.push({
            "link": completeUlr,
        })
        resultsJson.push({
            "link": completeUlr,
        })
        resultsJson.push({
            "link": completeUlr,
        })

        last_response.json(resultsJson)

    })


});


router.get('/mp3_download_page', function (req, res, next) {

    var id;

    if (req.query.id == undefined) {
        id = '0hG_I8USKIc'
    } else {
        id = req.query.id;
    }


    res.render('mp3_download_page', {id: id});
});


router.get('/shazam_chart', function (req, last_response, next) {

    (async () => {
        const browser = await puppeteer.launch({
            headless: true,

        });
        const page = await browser.newPage();

        //let url = 'https://www.shazam.com/charts/top-100/united-states'
        let url = 'https://www.shazam.com/charts/top-100/south-korea'

        await page.goto(url);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async () => {
            $("html, body").animate({scrollTop: $(document).height()}, 10);

            await new Promise(function (resolve) {
                setTimeout(resolve, 1200)
            });

            var resultsJson = [];


            $('.inner-content > .charttracks > ul  > li ').each(function () {

                var number = $(this).find('.number').text();
                var song_name = $(this).find('.title').children().next().text();
                var singer = $(this).find('.artist').children().next().text();
                var image = $(this).find('.image ').children().attr('src');
                var audio = $(this).find('meta[itemprop="audio"]').attr('content');


                resultsJson.push({
                    number: number,
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

        last_response.json(dimensions)


    })();
});


router.get('/get_music_url', function (req, last_response, next) {

    var id;

    if (req.query.id == undefined) {
        id = '0hG_I8USKIc'
    } else {
        id = req.query.id;
    }


    var spawn = require('child_process').spawn,
        ls = spawn('youtube-dl', ['https://www.youtube.com/watch?v=' + id, '-g']);

    let result = ''

    let i = 0;
    ls.stdout.on('data', function (data) {
        if (i == 0) {
            console.log('stdout: ' + data.toString());
            result = data.toString();
        }

        i++;
    });


    ls.on('exit', function (code) {
        console.log('child process exited with code ' + code.toString());

        let __resultArr = result.split('ratebypass=yes')

        console.log('#########0#####' + __resultArr[0]);
        console.log('########1######' + __resultArr[1]);
        console.log('########2######' + __resultArr[2]);

        last_response.json({result: __resultArr[1].replace('\n', '')})
    });


});

router.get('/download_mp3_v10', function (req, last_response, next) {

    var id;

    if (req.query.id == undefined) {
        id = 'EBt_88nxG4c'
    } else {
        id = req.query.id;
    }


    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
            dumpio: true,
        });
        const page = await browser.newPage();

        /*
         https://youtubemp3api.com/@api/button/mp3/0hG_I8USKIc
         */
        await page.goto('https://ytbapi.com/dl.php?link=https://www.youtube.com/watch?v=' + id + '&format=mp3&text=fff&color=009688');
        await page.addScriptTag({url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js'})
        //await page.addScriptTag({path: 'public/jquery3.js'});

        const dimensions = await page.evaluate(async () => {

            var resultsJson = [];
            /*
             await new Promise(function (resolve) {
             setTimeout(resolve, 1000)
             });*/

            $("#download-audio").trigger('click');


            await new Promise(function (resolve) {
                setTimeout(resolve, 1000)
            });


            let url = $("#container").children().attr('href');

            resultsJson.push({
                "link": url,
            })
            resultsJson.push({
                "link": url,
            })
            resultsJson.push({
                "link": url,
            })
            resultsJson.push({
                "link": url,
            })

            return resultsJson;
        });


        await browser.close();

        console.log('##############', dimensions);

        last_response.json(dimensions)

    })();
});

/////########## wokring!!!!!!! ####################
router.get('/download_mp3_v6', function (req, last_response, next) {

    var evalVar;

    if (req.query.id == undefined) {
        evalVar = 'EBt_88nxG4c'
    } else {
        evalVar = req.query.id;
    }

    /*    const puppeteer = require('puppeteer');*/

    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-gpu'],
            dumpio: true,
        });
        const page = await browser.newPage();
        await page.goto('https://ytmp3.cc/');
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        const dimensions = await page.evaluate(async (evalVar) => {


            console.log('#########evalVar#####' + evalVar);
            var resultsJson = [];

            $('#input').val('https://www.youtube.com/watch?v=' + evalVar)

            $('#submit').trigger('click');


            await new Promise(function (resolve) {
                setTimeout(resolve, 1500)
            });


            var link = $('#download').attr('href');

            resultsJson.push({
                "link": link

            })
            resultsJson.push({
                "link": link

            })
            resultsJson.push({
                "link": link

            })
            resultsJson.push({
                "link": link

            })

            return resultsJson;


        }, evalVar);

        await browser.close();

        console.log('##############', dimensions);

        last_response.json(dimensions)


    })();

});

/////////////////////////////////////////////////////////
/////////////여기가 다운로도되는곳이다/////////////////////////
/////////////////////////////////////////////////////////
router.get('/download_mp3_fast_v2', function (req, last_response, next) {

    var id = ''
    if (req.query.id === undefined) {
        id = 'ivPEKaBHjYA'
    } else {
        id = req.query.id; // extra param from front end
    }

    console.log('##############' + id);


    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
            dumpio: true,
        });
        const page = await browser.newPage();
        await page.goto('https://youtube2mp3api.com/@api/button/mp3/' + id);
        //await page.addScriptTag({url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js'})
        await page.addScriptTag({path: 'public/jquery3.js'});

        const dimensions = await page.evaluate(async () => {

            let resultArray = []

            await new Promise(function (resolve) {
                setTimeout(resolve, 5000)
            });

            let url = $('.download-result > #download_link').children().attr('href')

            let fullUrl = "http:" + url;

            resultArray.push({
                'link': fullUrl
            })
            resultArray.push({
                'link': fullUrl
            })
            resultArray.push({
                'link': fullUrl
            })
            resultArray.push({
                'link': fullUrl
            })

            return resultArray;

        });

        await browser.close();

        console.log('##############', dimensions);

        last_response.json(dimensions);


    })();


});


router.get('/download_mp3_fast', function (req, last_response, next) {

    var id = ''
    if (req.query.id === undefined) {
        id = 'ivPEKaBHjYA'
    } else {
        id = req.query.id; // extra param from front end
    }

    console.log('##############' + id);

    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
            dumpio: true,
        });

        const page = await browser.newPage();
        await page.goto('https://youtube2mp3api.com/@api/button/mp3/' + id);
        //await page.addScriptTag({url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js'})
        await page.addScriptTag({path: 'public/jquery3.js'});

        const dimensions = await page.evaluate(async () => {

            await new Promise(function (resolve) {
                setTimeout(resolve, 2000)
            });

            let url = $('.download-result > #download_link').children().attr('href')

            let fullUrl = "http:" + url;

            return fullUrl;

        });

        await browser.close();

        console.log('##############', dimensions);

        last_response.json(dimensions);


    })();


});


router.get('/juice_mp_download', function (req, last_response, next) {


    (async () => {
        const browser = await puppeteer.launch(
            {
                headless: true,
                args: ['--no-sandbox'],
                dumpio: true,

            });
        const page = await browser.newPage();
        await page.goto('https://www.mp3juices.cc/');
        //await page.addScriptTag({url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js'})
        await page.addScriptTag({path: 'public/jquery3.js'});

        let query = 'pink trauma'

        const dimensions = await page.evaluate(async (query) => {

            await new Promise(function (resolve) {
                setTimeout(resolve, 1000)
            });

            $('#query').val(query);


            await new Promise(function (resolve) {
                setTimeout(resolve, 300)
            });


            $('#button').trigger('click');

            await new Promise(function (resolve) {
                setTimeout(resolve, 700)
            });


            $('.download')[0].click();

            await new Promise(function (resolve) {
                setTimeout(resolve, 2000)
            });


            var resultsJson = $('#download_1').children().next().next().children().attr('href');


            return resultsJson;

        }, query);


        await browser.close();

        console.log('##############', dimensions);

        last_response.json(dimensions)

    })();
});


router.get('/ddd_mp3', function (req, res, next) {

    var id = req.query.id; // extra param from front end
    var title = req.query.title; // extra param from front end

    if (req.params.title == undefined) {
        title = 'test0010';
    }

    var youtubedl = require('youtube-dl');

    /*var url = 'https://www.youtube.com/watch?v=' + id;*/
    var stream = youtubedl('https://www.youtube.com/watch?v=bxV-OOIamyk'); //include youtbedl ... var youtubedl = require('ytdl');


//set response headers
    res.setHeader('Content-disposition', 'attachment; filename=' + title + '.mp3');
    res.setHeader('Content-type', 'audio/mpeg');

//set stream for conversion
    var proc = new ffmpeg({source: stream});

//currently have ffmpeg stored directly on the server, and ffmpegLocation is the path to its location... perhaps not ideal, but what I'm currently settled on. And then sending output directly to response.
    proc.setFfmpegPath(ffmpegLocation);
    proc.withAudioCodec('libmp3lame')
        .toFormat('mp3')
        .output(res)
        .run();
    proc.on('end', function () {
        console.log('finished');
    });

});


router.get('/test_mp3', function (req, last_response, next) {

//var id = req.query.id;

    var fs = require('fs');
    var youtubedl = require('youtube-dl');
    var ffmpeg = require('fluent-ffmpeg');

    var video = youtubedl('https://www.youtube.com/watch?v=bxV-OOIamyk',
        // Optional arguments passed to youtube-dl.
        ['--format=251'],
        // Additional options can be given for calling `child_process.execFile()`.
        {cwd: __dirname});

// Will be called when the download starts.
    var fileName = ''
    video.on('info', function (info) {
        console.log('Download started');
        console.log('filename: ' + info._filename);
        console.log('size: ' + info.size);

        fileName = info.filename;
        console.log('##############' + fileName);
    });

    var ffmpegPath = 'C:/ffmpeg-20180227-fa0c9d6-win64-static/bin/ffmpeg.exe';


//set stream for conversion
    proc = new ffmpeg({source: video, nolog: false});

//currently have ffmpeg stored directly on the server, and ffmpegLocation is the path to its location... perhaps not ideal, but what I'm currently settled on. And then sending output directly to response.
    proc.setFfmpegPath(ffmpegPath);
    proc.withAudioCodec('libmp3lame')
        .toFormat('mp3')
        .output(last_response).run();
    /*.run();*/
});

router.get('/get_album_art', function (req, last_response, next) {

    let query = req.query.query;

    (async () => {
        const browser = await puppeteer.launch(
            {
                headless: true,
                args: ['--no-sandbox'],
                dumpio: true,

            });
        const page = await browser.newPage();

        await page.goto('https://www.google.co.kr/search?q=' + encodeURI(query + ' album art') + '&dcr=0&tbm=isch&source=iu&ictx=1&fir=6VaCUPcyhIsZvM%253A%252CMshOIwMpwui8KM%252C_&usg=__jBNdgISvH-_qdiws6zKBm1Khl54%3D&sa=X&ved=0ahUKEwiIqIGx8tvZAhVBuJQKHUunC-kQ9QEIJzAA#imgrc=6VaCUPcyhIsZvM:');
        //await page.addScriptTag({url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js'})
        await page.addScriptTag({path: 'public/jquery3.js'});

        const dimensions = await page.evaluate(async () => {


            $('.rg_ic').first()[0].click();

            await new Promise(function (resolve) {
                setTimeout(resolve, 500)
            });

            var link = $('img[class=irc_mi]').attr('src')


            var resultsJson = [];

            resultsJson.push({
                "link": link

            })

            return resultsJson;


        });

        await browser.close();

        console.log('##############', dimensions);

        last_response.json(dimensions)


    })();
});


router.get('/download_mp3_v3', function (req, last_response, next) {


    let title = req.query.title;

    (async () => {
        const browser = await puppeteer.launch({
            headless: true
        });

        const page = await browser.newPage();
        await page.goto('https://www.mp3juices.cc/');
        //await page.addScriptTag({url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js'})
        await page.addScriptTag({path: 'public/jquery3.js'});


        const dimensions = await page.evaluate(async (title) => {

            var resultsJson = [];

            $('#query').val(title)

            $('#button').trigger('click');

            await new Promise(function (resolve) {
                setTimeout(resolve, 1000)
            });

            $('#result_1').children().next().next().children()[0].click();


            await new Promise(function (resolve) {
                setTimeout(resolve, 2000)
            });


            var link = $('.url').attr('href');

            resultsJson.push({
                "link": link

            })

            return resultsJson;


        }, title);

        await browser.close();

        console.log('##############', dimensions);

        last_response.json(dimensions)


    })();

});


router.get('/download_mp3_v3', function (req, last_response, next) {

    (async () => {
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox'],

        });
        const page = await browser.newPage();
        await page.goto('https://www.mp3juices.cc/');
        //await page.addScriptTag({url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js'})
        await page.addScriptTag({path: 'public/jquery3.js'});

        const dimensions = await page.evaluate(async () => {

            $('#query').val('pink trauma');

            $('#button').trigger('click');

            await new Promise(function (resolve) {
                setTimeout(resolve, 700)
            });


            $('.download')[0].click();

            await new Promise(function (resolve) {
                setTimeout(resolve, 1500)
            });


            var resultsJson = $('#download_1').children().next().next().children().attr('href');


            return resultsJson;


        });

        await browser.close();

        last_response.json(dimensions)


    })();


});

/**
 * ###################################
 * mp3 다은로드 오리지널.........................
 * #####################################
 */
router.get('/download_mp3_v2', function (req, last_response, next) {

    var id;

    if (req.query.id == undefined) {
        id = '0hG_I8USKIc'
    } else {
        id = req.query.id;
    }


    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
            dumpio: true,
        });
        const page = await browser.newPage();

        /*
         https://youtubemp3api.com/@api/button/mp3/0hG_I8USKIc

         */
        await page.goto('https://youtubemp3api.com/@api/button/mp3/' + id);
        //await page.addScriptTag({url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js'})
        await page.addScriptTag({path: 'public/jquery3.js'});


        await page.waitForSelector('.download-mp3-url');

        const dimensions = await page.evaluate(async () => {

            var resultsJson = [];

            $('.download-result > .download-mp3-url').each(function () {
                var link = $(this).attr('href')

                resultsJson.push({
                    "link": link

                })

            });

            return resultsJson;


        });

        await browser.close();

        console.log('##############', dimensions);

        last_response.json(dimensions)


    })();
});


router.get('/download_mp4_for_playing_music/', function (req, res, next) {
    var id = req.query.id;


    if (req.query.id == undefined) {
        id = 'rjINNeC0DFA';
    }


    var video = youtubedl('https://www.youtube.com/watch?v=' + id,
        // Optional arguments passed to youtube-dl.
        ['--format=140'],
        // Additional options can be given for calling `child_process.execFile()`.
        {cwd: __dirname});

// Will be called when the download starts.

    video.on('info', function (info) {
        console.log('Download started');
        console.log('filename: ' + info._filename);
        console.log('size: ' + info.size);
        res.header('Content-Disposition', 'attachment; filename="' + info.size + ".m4a" + '"');
    });

    //video.pipe(fs.createWriteStream('x:/download2/myvideo.mp4'));

    //video.pipe(fs.createWriteStream(fileName))

    //video.get('remote_file_url').pipe(res);

    video.pipe(res);

    video.on('end', function () {
        //res.end({"status":"Completed"});
    });

});


router.get('/download_mp4/', function (req, res, next) {
    var id = req.query.id;


    if (req.query.id == undefined) {
        id = 'rjINNeC0DFA';
    }


    var video = youtubedl('https://www.youtube.com/watch?v=' + id,
        // Optional arguments passed to youtube-dl.
        ['--format=18'],
        // Additional options can be given for calling `child_process.execFile()`.
        {cwd: __dirname});

// Will be called when the download starts.

    video.on('info', function (info) {
        console.log('Download started');
        console.log('filename: ' + info._filename);
        console.log('size: ' + info.size);
        res.header('Content-Disposition', 'attachment; filename="' + info.size + ".mp4" + '"');
    });

    //video.pipe(fs.createWriteStream('x:/download2/myvideo.mp4'));

    //video.pipe(fs.createWriteStream(fileName))

    //video.get('remote_file_url').pipe(res);

    video.pipe(res);

    video.on('end', function () {
        //res.end({"status":"Completed"});
    });

});

router.get('/download_audio/', function (req, res, next) {
    var id = req.query.id;

    if (req.query.id == undefined) {
        id = 'rjINNeC0DFA';
    }

    var video = youtubedl('https://www.youtube.com/watch?v=' + id,
        // Optional arguments passed to youtube-dl.
        ['--format=140'],
        // Additional options can be given for calling `child_process.execFile()`.
        {cwd: __dirname});

// Will be called when the download starts.

    video.on('info', function (info) {
        console.log('Download started');
        console.log('filename: ' + info._filename);
        console.log('size: ' + info.size);

        var fileName = info.filename;
        res.header('Content-Disposition', 'attachment; filename="' + info.size + ".m4a" + '"');
    });

    //video.pipe(fs.createWriteStream('x:/download2/myvideo.mp4'));

    //video.pipe(fs.createWriteStream(fileName))

    //video.get('remote_file_url').pipe(res);

    video.pipe(res);

    video.on('end', function () {
        //res.end({"status":"Completed"});
    });

});


router.get('/download_mp4_v2/', function (req, res, next) {
    var id = req.query.id;

    if (req.query.id == undefined) {
        id = 'rjINNeC0DFA';
    }

    var video = youtubedl('https://www.youtube.com/watch?v=' + id,
        // Optional arguments passed to youtube-dl.
        ['--format=140'],
        // Additional options can be given for calling `child_process.execFile()`.
        {cwd: __dirname});

// Will be called when the download starts.

    video.on('info', function (info) {
        console.log('Download started');
        console.log('filename: ' + info._filename);
        console.log('size: ' + info.size);

        var fileName = info.filename;
        res.header('Content-Disposition', 'attachment; filename="' + info.size + ".mp4" + '"');
    });

    //video.pipe(fs.createWriteStream('x:/download2/myvideo.mp4'));

    //video.pipe(fs.createWriteStream(fileName))

    //video.get('remote_file_url').pipe(res);

    video.pipe(res);

    video.on('end', function () {
        //res.end({"status":"Completed"});
    });

});


router.get('/to_mp3/', function (req, res, next) {


    var ffmpegPath = "";
    var id = req.query.id; // extra param from front end
    var title = ''; // extra param from front end

    if (req.query.title == undefined) {
        title = '__temp'
    } else {
        title = req.query.title;
    }


    var err; // Hoist the error variable declaration
    var proc;
    try {

        var url = 'https://www.youtube.com/watch?v=' + id;
        var stream;

        var err2;
        try {
            stream = youtubedl(url); //include youtbedl ... var youtubedl = require('ytdl');
        } catch (e) {
            err2 = e
            console.log('############## youtube stream error');
            console.log('##############', e);

            stream.close();
        }


        if (!err2) {
            ffmpegPath = 'C:/ffmpeg-20180227-fa0c9d6-win64-static/bin/ffmpeg.exe';

            //set response headers
            res.setHeader('Content-disposition', 'attachment; filename=' + title + '.mp3');
            res.setHeader('Content-type', 'audio/mpeg');

            //set stream for conversion
            proc = new ffmpeg({source: stream, nolog: false});

            //currently have ffmpeg stored directly on the server, and ffmpegLocation is the path to its location... perhaps not ideal, but what I'm currently settled on. And then sending output directly to response.
            proc.setFfmpegPath(ffmpegPath);
            proc.withAudioCodec('libmp3lame')
                .toFormat('mp3')
                .output(res)
                .run();
        }


    } catch (ex) {
        console.log('#####error--------->#####', ex);
        err = ex // Note here

    }

    if (!err) {
        proc.on('end', function () {
            console.log('finished');
        });
    }


});

/////////working now#################
////////////////////////////////////////////////////////////
// ############           mp3_download_128 #################
////////////////////////////////////////////////////////
router.get('/mp3_192', function (req, last_response, next) {


    var id;


    if (req.query.id == undefined) {
        id = '0hG_I8USKIc'
    } else {
        id = req.query.id;
    }


    (async () => {


        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-gpu',
            ],
            /*args: [],*/
            dumpio: true,
        });


        const page = await browser.newPage();
        await page.goto('https://www.yt-download.org/@api/button/mp3/' + id);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})


        await page.waitForSelector('.container');

        const dimensions = await page.evaluate(async () => {

            let resultList = [];

            /*  $('.download-result> link').each(function async() {

             var href = $(this).children().attr('href')

             ;*/

            //let href = $(".link").children().attr('href')
            let href = $(".link:nth-child(3)").children().attr('href')

            resultList.push({
                link: href
            })

            resultList.push({
                link: href
            })

            resultList.push({
                link: href
            })

            resultList.push({
                link: href
            })


            //alert(href);

            return resultList;

        });

        await browser.close();
        console.log('##############', dimensions);
        last_response.json(dimensions)

    })();


});


router.get('/mp3_123', function (req, last_response, next) {


    var id;


    if (req.query.id == undefined) {
        id = '0hG_I8USKIc'
    } else {
        id = req.query.id;
    }


    (async () => {


        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-gpu',
            ],
            /*args: [],*/
            dumpio: true,
        });


        const page = await browser.newPage();
        await page.goto('https://savetomp3.com/ko/');
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})


        /*await page.waitForSelector('.container');*/

        const dimensions = await page.evaluate(async (id) => {

            let resultList = [];

            $('.nice_search').val('https://www.youtube.com/watch?v=' + id)

            $("#submit-b").trigger('click');

            await new Promise(function (resolve) {
                setTimeout(resolve, 1000)
            });

            $('div[data-vid-id="' + id + '"]').trigger('click');

        }, id);

        let results = [];

        page.on('response', async response => {
            //console.log('##############',response);

            const status = response.status()
            /* if ((status >= 300) && (status <= 399)) {
             console.log('Redirect from', response.url(), 'to', response.headers()['location'])
             }*/

            if (status == 200) {
                //console.log('22222222222222Redirect from', response.url());

                if (response.url().toString().includes('@download')) {

                    console.log('---------- from', response.url());

                    results.push({
                        link: response.url()
                    })
                    results.push({
                        link: response.url()
                    })
                    results.push({
                        link: response.url()
                    })
                    results.push({
                        link: response.url()
                    })

                }
            }
        })


        setTimeout(async () => {

            await browser.close();
            console.log('##############', results);
            last_response.json(results)

        }, 1000 * 10)

    })();

});


/**
 * ###################################
 * mp3 다은로드 오리지널...(NEWNEWNEWNEWNEW)......................
 * #####################################
 */
router.get('/download_mp3_v5_xxxxxxxxxxx', function (req, last_response, next) {

    var id;


    if (req.query.id == undefined) {
        id = '0hG_I8USKIc'
    } else {
        id = req.query.id;
    }


    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
            dumpio: true,
        });
        const page = await browser.newPage();

        /*
         https://youtubemp3api.com/@api/button/mp3/0hG_I8USKIc


         */
        await page.goto('https://youtubemp3api.com/@api/button/mp3/' + id);

        /*await page.addScriptTag({url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js'})*/
        await page.addScriptTag({path: 'public/jquery3.js'});

        await page.waitForSelector('.download-mp3-url');

        const dimensions = await page.evaluate(async () => {
            var resultsJson = [];

            $('.download-result > .download-mp3-url').each(function () {
                var link = $(this).attr('href')

                resultsJson.push({
                    "link": link
                })

            });
            return resultsJson;
        });

        await browser.close();


        for (var i = 0; i < dimensions.length; i++) {

            let __link = dimensions[i].link;

            dimensions[i].link = 'http:' + __link;

        }

        console.log('##############', dimensions);

        last_response.json(dimensions)
    })();


});

/*##############################################*/
/*            mp3_mini입니다         */
/*##############################################*/
/*
 router.get('/download_mp3_v5', function (req, last_response, next) {

 var id;

 if (req.query.auth != 'kyungjoon') {
 last_response.json('')
 } else {

 if (req.query.id == undefined) {
 id = '0hG_I8USKIc'
 } else {
 id = req.query.id;
 }


 (async () => {

 const browser = await puppeteer.launch({
 headless: true,
 args: [
 '--no-sandbox',
 '--disable-gpu',
 '--window-size=1920x1080'
 ],
 /!*args: [],*!/
 dumpio: true,
 });


 const page = await browser.newPage();
 await page.goto('https://youtube7.download/mini.php?id=' + id);
 await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

 await page.waitForSelector('.hrefdownload');

 const dimensions = await page.evaluate(async () => {
 await new Promise(function (resolve) {
 setTimeout(resolve, 1000)
 });


 let result = [];


 let link = $(".hrefdownload").attr('href')


 result.push({
 link: link,
 })

 result.push({
 link: link,
 })

 result.push({
 link: link,
 })

 result.push({
 link: link,
 })

 return result;

 });

 await browser.close();
 console.log('##############', dimensions);
 last_response.json(dimensions)

 })();
 }


 });*/
////////////////////////////////////////////////////////////
// ############           mp3_download_128 #################
////////////////////////////////////////////////////////

router.get('/mp3_download_128__block', function (req, last_response, next) {

    var id;


    if (req.query.id == undefined) {
        id = '0hG_I8USKIc'
    } else {
        id = req.query.id;
    }

    (async () => {

        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-gpu',
                '--window-size=1920x1080'
            ],
            /*args: [],*/
            dumpio: true,
        });


        const page = await browser.newPage();
        await page.goto('https://youtube7.download/mini.php?id=' + id);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        await page.waitForSelector('.hrefdownload');

        const dimensions = await page.evaluate(async () => {
            await new Promise(function (resolve) {
                setTimeout(resolve, 1000)
            });


            let result = [];


            let link = $(".hrefdownload").attr('href')


            result.push({
                link: link,
            })

            result.push({
                link: link,
            })

            result.push({
                link: link,
            })

            result.push({
                link: link,
            })

            return result;

        });

        await browser.close();
        console.log('##############', dimensions);
        last_response.json(dimensions)

    })();
    /////////////////////////////////////


});


router.get('/download_mp3_v5_128128128128128', function (req, last_response, next) {


    var id;

    if (req.query.auth != 'kyungjoon') {
        last_response.json('')
    } else {

        if (req.query.id == undefined) {
            id = '0hG_I8USKIc'
        } else {
            id = req.query.id;
        }


        (async () => {

            const browser = await puppeteer.launch({
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-gpu',
                    '--window-size=1920x1080'
                ],
                /*args: [],*/
                dumpio: true,
            });

            //download 64k mp3 download
            //download 64k mp3 download
            //download 64k mp3 download
            const page = await browser.newPage();
            await page.goto('https://youtube7.download/mini.php?id=' + id);
            await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

            await page.waitForSelector('.hrefdownload');

            const dimensions = await page.evaluate(async () => {
                await new Promise(function (resolve) {
                    setTimeout(resolve, 1000)
                });


                let result = [];


                let link = $(".hrefdownload").attr('href')


                result.push({
                    link: link,
                })

                result.push({
                    link: link,
                })

                result.push({
                    link: link,
                })

                result.push({
                    link: link,
                })

                return result;

            });

            await browser.close();
            console.log('##############', dimensions);
            last_response.json(dimensions)

        })();
    }


});


/*##############################################*/
/*#####              mp3dn_new                  */
/*##############################################*/
router.get('/download_mp3_v5_____block', function (req, last_response, next) {
    //http://gazua.kyungjoongo.site:1234/download_mp3_v5?auth=kyungjoon&id=

    //http://localhost:4000/download_mp3_v5?auth=kyungjoon
    //http://gazua.kyungjoongo.site:1234/download_mp3_v5?auth=kyungjoon
    var id;


    if (req.query.id == undefined) {
        id = 'EedPfUeBf2A'
    } else {
        id = req.query.id;
    }

    (async () => {


        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-gpu',
            ],
            /*args: [],*/
            dumpio: true,
        });


        const page = await browser.newPage();
        await page.goto('https://youtube2mp3api.com/@api/button/mp3/' + id);
        await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

        //http://localhost:4000/download_mp3_v5?auth=kyungjoon&id=FRjOSmc01-M
        /*await new Promise(function (resolve) {
            setTimeout(resolve, 2500)
        });*/
        //await page.waitForSelector('div[id=download_link]');

        await page.waitForSelector('div[id=download_link]', {timeout: 1000 * 5});

        const dimensions = await page.evaluate(async () => {

            let result = $(".download-result").children().html();
            return result;

        });

        let __result = dimensions.split('href=');


        /*console.log('##############'+ __result[0]);
         console.log('##############'+ __result[1]);
         console.log('##############'+ __result[2]);*/

        let ____result = __result[1].split("download=")

        console.log('##############' + ____result[0].replace('"', '').replace('"', ''));


        let finalResult = ____result[0].replace('"', '').replace('"', '');

        finalResult = "http:" + finalResult;

        console.log('finalResult-->' + finalResult);

        let tempArray = [];

        tempArray.push({
            link: finalResult
        })
        tempArray.push({
            link: finalResult
        })
        tempArray.push({
            link: finalResult
        })
        tempArray.push({
            link: finalResult
        })


        await browser.close();
        last_response.json(tempArray)


    })();


    //////////////////


});

module.exports = router;
