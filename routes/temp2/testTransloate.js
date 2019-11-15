var googleTranslate = require('google-translate')('AIzaSyBKUzXer7EzFuaG8cChWJ-P3dNytCXY5pI');


googleTranslate.translate('My name is Brandon', 'ko', function (err, translation) {
    console.log(translation);

    console.log(err)

});