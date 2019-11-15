const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
var googleTranslate = require('google-translate')('AIzaSyAV-2b3UNzzvFsXWJzOjVTtaRnd1GHLlEU');


client.labelDetection('E:\\instagram_pictures\\Screenshot 2018-03-14 at 11.16.55.png').then(async results => {

    const translate = require('translate');
    translate.engine = 'google';
    translate.key = 'AIzaSyAV-2b3UNzzvFsXWJzOjVTtaRnd1GHLlEU';

    const labels = results[0].labelAnnotations;
    var arrResults = [];
//        labels.forEach(async label => {


    for (let label of labels) {

        const desc = await translate(label.description, 'ko');

        //console.log('##############'+ desc + ":"+ (label.score).toFixed(2) * 100 + "%");


        arrResults.push({
            desc: desc,
            score: (label.score).toFixed(2) * 100 + "%"
        })
    }

    console.log(arrResults);
})
