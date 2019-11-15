var express = require('express');
var router = express.Router();
var beautify = require("json-beautify");
var cheerio = require('cheerio');
var request = require('request');
var syncRequest = require('sync-request');
var querystring = require('querystring');
var striptags = require('striptags');
var prettyjson = require('prettyjson');
var fs = require('fs');
/*const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();*/


var client_id = 'NJ52okBkv2Fg5CGklQif';
var client_secret = '30vmVQ0p79';
var client_ids = ['IJ3GDacUbH4O_zfaMbCQ', '6nGjq4U_Cojcmgly0Fuy', '7DhO7J70Biy2Jz1xa6mX']
var client_secrets = ['uTURoZKF9N', '7nT2n8KYbV', 'cNuri56BWk']
const puppeteer = require('puppeteer');
const translate = require('translate');
translate.engine = 'google';
translate.key = 'AIzaSyAV-2b3UNzzvFsXWJzOjVTtaRnd1GHLlEU';


/*

router.post('/google_label_detection', function (req, res) {


    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    let name = req.files.sampleFile.name;
    let postFixRandNo = Math.floor((Math.random() * 500) + 1);

    //let baseUrl = 'e:/upload/'
    let baseUrl = './images/'
    let fixedName = 'temp_image' + postFixRandNo + '.jpg'


    console.log('##############', fixedName);

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(baseUrl + fixedName, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        client.labelDetection(baseUrl + fixedName).then(async results => {

            const translate = require('translate');
            translate.engine = 'google';
            translate.key = 'AIzaSyAV-2b3UNzzvFsXWJzOjVTtaRnd1GHLlEU';

            const labels = results[0].labelAnnotations;
            var arrResults = [];
            for (let label of labels) {

                const desc = await translate(label.description, 'ko');

                //console.log('##############'+ desc + ":"+ (label.score).toFixed(2) * 100 + "%");


                arrResults.push({
                    desc: desc,
                    label_score: (label.score).toFixed(2) * 100 + "%"
                })
            }
            res.json(arrResults)

        })


    });


});

*/
router.get('/face_test001', function (req, last_response, next) {

    var sightengine = require('sightengine')('721699261', '6hprE685aFhJT8UcFQg3');
    sightengine.check(['celebrities']).set_url('http://kyungjoon77.iptime.org:4000/images/IMG_0073.png').then(function (result) {
        // The result of the API

        // console.log(result)


        console.log(result)


        last_response.json(result)


    }).catch(function (err) {
        // Error
    });

});


router.post('/face_upload_i18n', function (req, res, next) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    let name = req.files.sampleFile.name;
    let postFixRandNo = Math.floor((Math.random() * 500) + 1);

    //let baseUrl = 'e:/upload/'
    let baseUrl = './images/'
    let fixedName = 'temp_image' + postFixRandNo + '.jpg'


    console.log('##############', fixedName);

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(baseUrl + fixedName, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        //res.send('File uploaded!');

        var request = require('request');
        var api_url = 'https://openapi.naver.com/v1/vision/celebrity'; // 유명인 인식
        //var api_url = 'https://openapi.naver.com/v1/vision/face'; // 얼굴 감지

        var _formData = {
            image: 'image',
            image: fs.createReadStream(baseUrl + fixedName)
            //image: fs.createReadStream(sampleFile)
        };

        let randClientIdNo = Math.floor((Math.random() * 3) + 0);


        var _req = request.post({
            url: api_url, formData: _formData,
            headers: {
                'X-Naver-Client-Id': client_ids[randClientIdNo],
                'X-Naver-Client-Secret': client_secrets[randClientIdNo]
            }
        }).on('response', function (response) {
            console.log(response.statusCode) // 200
            console.log(response.headers['content-type'])
        });


        console.log(request.head);
        _req.pipe(res); // 브라우저로 출력

    });
});


router.post('/face_upload2', function (req, res, next) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    let name = req.files.sampleFile.name;
    let postFixRandNo = Math.floor((Math.random() * 500) + 1);

    //let baseUrl = 'e:/upload/'
    let baseUrl = './images/'
    let fixedName = 'temp_image' + postFixRandNo + '.jpg'


    console.log('##############', baseUrl + fixedName);

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(baseUrl + fixedName, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        //res.send('File uploaded!');

        var request = require('request');
        var api_url = 'https://openapi.naver.com/v1/vision/celebrity'; // 유명인 인식
        //var api_url = 'https://openapi.naver.com/v1/vision/face'; // 얼굴 감지

        var _formData = {
            image: 'image',
            image: fs.createReadStream(baseUrl + fixedName)
            //image: fs.createReadStream(sampleFile)
        };

        let randClientIdNo = Math.floor((Math.random() * 3) + 0);


        var _req = request.post({
            url: api_url, formData: _formData,
            headers: {
                'X-Naver-Client-Id': client_ids[randClientIdNo],
                'X-Naver-Client-Secret': client_secrets[randClientIdNo]
            }
        }).on('response', function (response) {
            console.log(response.statusCode) // 200
            console.log(response.headers['content-type'])
        });


        console.log(request.head);
        _req.pipe(res); // 브라우저로 출력

    });
});

router.post('/face_upload_new', function (req, last_response, next) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    let name = req.files.sampleFile.name;
    let postFixRandNo = Math.floor((Math.random() * 500000) + 1);

    let baseUrl = './public/images/' //@todo:remote
    let fixedName = 'temp_image' + postFixRandNo + '.jpg'

    console.log('fixedName--->', fixedName);

    let fullImagePath = baseUrl + fixedName

    console.log(fixedName);


    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(fullImagePath, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        //////////###########
        var request = require('request');
        var hostname = 'http://gazua.kyungjoongo.shop:4000' //@todo://remote

        //var hostname ='http://kyungjoon77.ipdisk.co.kr:4000' //@todo://localhost
        var api_url = 'http://www.pictriev.com/facedbj.php?findface&image=' + hostname + '/images/' + fixedName


        //var api_url = 'http://www.pictriev.com/facedbj.php?findface&image=http://kyungjoon77.iptime.org:4000/images/temp_image10.jpg'

        request.get({
            url: api_url,
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                console.log(JSON.parse(body))

                let __result = JSON.parse(body);

                console.log(__result.imageid)

                let imageId = __result.imageid;

                console.log('imageId===>' + imageId);

                let requestUir = 'http://www.pictriev.com/facedbj.php?whoissim&imageid=' + imageId.trim() + '&faceid=0&lang=ko'

                request.get({
                    url: requestUir,
                }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {

                        console.log(JSON.parse(body))

                        let result2 = JSON.parse(body);
                        let fianlResult = []
                        if (result2.result != 'FAIL') {

                            let celubList = result2.attrs
                            let age = result2.age;
                            let gender = result2.gender;

                            celubList.forEach(item => {
                                fianlResult.push({
                                    celub: item[2],
                                    score: Math.ceil(item[1] * 100),
                                    img: 'http://www.pictriev.com/imgj.php?facex=' + item[3],
                                    age: result2.age,
                                    gender: result2.gender[0],
                                    genderPercentage: Math.ceil(result2.gender[1] * 100),
                                })
                            })

                            console.log('live--->', fianlResult);

                            last_response.json(fianlResult)
                        } else {
                            fianlResult.push({
                                result: 'fail'
                            })
                            last_response.json(fianlResult)
                        }


                    } else {
                        last_response.json(response)
                    }
                }).on('error', function (err) {
                    console.error(err)
                }).pipe(fs.createWriteStream('error!!!!!!'))


            } else {

                console.log('sdlkfsldkflsdkf', error)
            }
        });


    });
});

router.post('/face_upload_new_en', function (req, last_response, next) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    let name = req.files.sampleFile.name;
    let postFixRandNo = Math.floor((Math.random() * 500) + 1);

    //let baseUrl = 'e:/upload/'
    let baseUrl = './public/images/'
    let fixedName = 'temp_image' + postFixRandNo + '.jpg'


    console.log('fixedName--->', fixedName);

    let fullImagePath = baseUrl + fixedName

    console.log(fixedName);


    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(baseUrl + fixedName, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        //////////###########
        var request = require('request');
        var hostname = 'http://gazua.kyungjoongo.shop:4000' //remote
        //var hostname ='http://gazua.kyungjoongo.site:7777' //remote2
        //var hostname= 'http://kyungjoon77.iptime.org:4000' //local
        var api_url = 'http://www.pictriev.com/facedbj.php?findface&image=' + hostname + '/images/' + fixedName

        //var api_url = 'http://www.pictriev.com/facedbj.php?findface&image=http://kyungjoon77.iptime.org:4000/images/temp_image10.jpg'

        request.get({
            url: api_url,
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(JSON.parse(body))

                let __result = JSON.parse(body);

                console.log(__result.imageid)

                let imageId = __result.imageid;

                let requestUir = 'http://www.pictriev.com/facedbj.php?whoissim&imageid=' + imageId.trim() + '&faceid=0&lang=en'

                request.get({
                    url: requestUir,
                }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {

                        console.log(JSON.parse(body))

                        let result2 = JSON.parse(body);
                        let fianlResult = []
                        if (result2.result != 'FAIL') {

                            let celubList = result2.attrs
                            let age = result2.age;
                            let gender = result2.gender;


                            celubList.forEach(item => {
                                fianlResult.push({
                                    celub: item[2],
                                    score: Math.ceil(item[1] * 100),
                                    img: 'http://www.pictriev.com/imgj.php?facex=' + item[3],
                                    age: result2.age,
                                    gender: result2.gender[0],
                                    genderPercentage: Math.ceil(result2.gender[1] * 100),
                                })
                            })

                            console.log('live--->', fianlResult);

                            last_response.json(fianlResult)
                        } else {
                            fianlResult.push({
                                result: 'fail'
                            })
                            last_response.json(fianlResult)
                        }


                    } else {
                        last_response.json(response)
                    }
                });


            } else {

                console.log('sdlkfsldkflsdkf', error)
            }
        });


    });
});


router.post('/face_upload_global', function (req, last_response, next) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    let name = req.files.sampleFile.name;
    let postFixRandNo = Math.floor((Math.random() * 500) + 1);

    //let baseUrl = 'e:/upload/'
    let baseUrl = './images/'
    let fixedName = 'temp_image' + postFixRandNo + '.jpg'


    console.log('##############', fixedName);

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(baseUrl + fixedName, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        //res.send('File uploaded!');

        let imageFullUri = baseUrl + fixedName


        var sightengine = require('sightengine')('721699261', '6hprE685aFhJT8UcFQg3');
        sightengine.check(['celebrities']).set_file(imageFullUri).then(function (result) {

            /*console.log(request.head);
        _req.pipe(res); // 브라우저로 출력*/

            last_response.json(result)

        }).catch(function (err) {
            // Error
        });


    });
});


router.post('/face_upload/', function (req, last_response, next) {

    var client_id = 'NJ52okBkv2Fg5CGklQif';
    var client_secret = '30vmVQ0p79';


    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.file;
    let name = req.files.file.name;

    let baseUrl = 'e:/upload/'
    let fixedName = 'temp_image.jpg'
    //let baseUrl = './'


    console.log('##############' + name);

    console.log(sampleFile);

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(baseUrl + fixedName, function (err) {
        if (err) {

            console.log('##############애러다');
            return last_response.status(500).send(err);
        }


        //res.send('File uploaded!');

        var request = require('request');
        var api_url = 'https://openapi.naver.com/v1/vision/celebrity'; // 유명인 인식
        //var api_url = 'https://openapi.naver.com/v1/vision/face'; // 얼굴 감지

        var _formData = {
            image: 'image',
            image: fs.createReadStream(baseUrl + fixedName)
            //image: fs.createReadStream(sampleFile)
        };


        var _req = request.post({
            url: api_url, formData: _formData,
            headers: {'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret}
        }).on('response', function (response) {
            console.log(response.statusCode) // 200
            console.log(response.headers['content-type'])
        });
        console.log(request.head);
        _req.pipe(last_response); // 브라우저로 출력
    });
});

//##############################################

router.get('/naver_image/', function (req, last_response, next) {

    var query = req.query.query;

    var api_url = 'https://openapi.naver.com/v1/search/image?display=20&start=1' + '&sort=sim&query=' + encodeURI(query); // json 결과
    var striptags = require('striptags');
    var prettyjson = require('prettyjson');


    request({
        url: api_url,
        headers: {'X-Naver-Client-Id': 'e8G6hWbcN1XdeCN9DIgQ', 'X-Naver-Client-Secret': 'wCcRnTYrhN'},
        method: 'GET'
    }, function (err, _response, body) {
        //it works!

        var blogArrray = JSON.parse(body);


        for (var i = 0; i < blogArrray.items.length; i++) {


            console.log('##############' + striptags(blogArrray.items[i].title))

            var title = striptags(blogArrray.items[i].title);

            var link = blogArrray.items[i].link.replace('&amp;', '&')


            blogArrray.items[i].title = title;
            blogArrray.items[i].link = link;

        }


        console.log(prettyjson.render(blogArrray.items, {noColor: true}));
        last_response.json(blogArrray.items)
    });
});


router.get('/face_recon_test', function (req, res) {

    var client_id = 'NJ52okBkv2Fg5CGklQif';
    var client_secret = '30vmVQ0p79';
    var request = require('request');
    var api_url = 'https://openapi.naver.com/v1/vision/celebrity'; // 유명인 인식
    //var api_url = 'https://openapi.naver.com/v1/vision/face'; // 얼굴 감지

    var _formData = {
        image: 'image',
        image: fs.createReadStream('e:/upload/' + '1.jpg')
    };


    var _req = request.post({
        url: api_url, formData: _formData,
        headers: {'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret}
    }).on('response', function (response) {
        console.log(response.statusCode) // 200
        console.log(response.headers['content-type'])

        console.log(response.body);
    });

    /*const translate = require('translate');
    translate.engine = 'google';
    translate.key = 'AIzaSyAV-2b3UNzzvFsXWJzOjVTtaRnd1GHLlEU';
     const desc = await translate(label.description, 'ko');*/


    _req.pipe(res); // 브라우저로 출력


});


router.get('/google_face_detect', function (req, res) {


    client.faceDetection('E:\\instagram_pictures\\Screenshot 2018-03-14 at 11.17.50.png').then(results => {

        const faces = results[0].faceAnnotations;


        let arrResult = [];

        console.log('Faces:');
        faces.forEach((face, i) => {
            console.log(`  Face #${i + 1}:`);

            /*face.joyLikelihood= face.joyLikelihood.replace('VERY', '매우').replace('LIKELY', '그렇다').replace('UN', '안').replace('_', ' ')
            face.angerLikelihood= face.angerLikelihood.replace('VERY', '매우').replace('LIKELY', '그렇다').replace('UN', '안').replace('_', ' ')
            face.sorrowLikelihood= face.sorrowLikelihood.replace('VERY', '매우').replace('LIKELY', '그렇다').replace('UN', '안').replace('_', ' ')
            face.surpriseLikelihood= face.surpriseLikelihood.replace('VERY', '매우').replace('LIKELY', '그렇다').replace('UN', '안').replace('_', ' ')*/


            /*   console.log(`    기쁨: ${face.joyLikelihood}`);
               console.log(`    화남: ${face.angerLikelihood}`);
               console.log(`    슬픔: ${face.sorrowLikelihood}`);
               console.log(`    놀람: ${face.surpriseLikelihood}`);*/

            arrResult.push({
                'smile': face.joyLikelihood,
                'anger': face.angerLikelihood,
                'sorrow': face.sorrowLikelihood,
                'nolram': face.surpriseLikelihood
            })


        });

        console.log(arrResult)

        res.json(arrResult);
    }).catch(err => {
        console.error('ERROR:', err);
    });
});

router.get('/google_image_search', function (req, res) {


    var _query = req.query.q;

    const imageSearch = require('image-search-google');
    const client = new imageSearch('007828852513579057554:b1l_axphzqs', 'AIzaSyAlfytAQccsUnNgLWXsC9RIB3DrJsElRhU');
    var options = {page: 1, type: 'face'};
    client.search(_query, options).then(images => {
        client.search(_query, {page: 2}).then(images2 => {
            let combinedResult = images.concat(images2)
            res.json(combinedResult);
        })
    }).catch(error => console.log(error))

});


module.exports = router;
