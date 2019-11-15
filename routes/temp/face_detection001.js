var sightengine = require('sightengine')('721699261', '6hprE685aFhJT8UcFQg3');
sightengine.check(['celebrities']).set_url('http://kyungjoon77.iptime.org:4000/images/IMG_0073.png').then(function(result) {
    // The result of the API

   // console.log(result)


    console.log(result)





}).catch(function(err) {
    // Error
});
