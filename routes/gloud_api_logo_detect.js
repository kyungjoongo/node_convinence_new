const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
// const fileName = 'Local image file, e.g. /path/to/image.png';

// Performs logo detection on the local file
client
    .logoDetection('E:\\instagram_pictures\\nike.png')
    .then(results => {
        const logos = results[0].logoAnnotations;
        console.log('Logos:');
        logos.forEach(logo => console.log(logo));
    })
    .catch(err => {
        console.error('ERROR:', err);
    });