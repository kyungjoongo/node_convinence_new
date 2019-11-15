/*
AIzaSyAV-2b3UNzzvFsXWJzOjVTtaRnd1GHLlEU*/
var googleTranslate = require('google-translate')('AIzaSyAV-2b3UNzzvFsXWJzOjVTtaRnd1GHLlEU');


googleTranslate.translate('My name is Brandon', 'ko', function(err, translation) {
    console.log(translation.translatedText);
    // =>  Mi nombre es Brandon
});

googleTranslate.translate('My name is kyungjoon go', 'ko', function(err, translation) {
    console.log(translation.translatedText);
    // =>  Mi nombre es Brandon
});