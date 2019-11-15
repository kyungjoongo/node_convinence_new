var casper_nodejs = require('../../index.js');

var url = "http://google.com";
// load the page refered with 'url' with casper
var casper = casper_nodejs.create(url, {});

// once the page is loaded, execute that in our current nodejs context
casper.then(function executed_in_this_context() {
    console.log("page loaded");
});

// then, execute that in casperjs, and the second callback in the current nodejs context
casper.then(function executed_in_casperjs_context() {
    return 42;
}, function executed_in_this_context(ret) {
    console.log("it works: " + ret);

    // casper.exit() can be placed here too, instead of in the bottom :)
    // casper.exit();
});

// exit casper after executing the 2 previous 'then'
casper.exit();
