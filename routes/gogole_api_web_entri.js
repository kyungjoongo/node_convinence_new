// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
// const fileName = 'Local image file, e.g. /path/to/image.png';

// Detect similar images on the web to a local file
client
    .webDetection('E:\\instagram_pictures\\Screenshot 2018-03-14 at 11.21.31.png')
    .then(results => {
        const webDetection = results[0].webDetection;

        if (webDetection.fullMatchingImages.length) {
            console.log(
                `Full matches found: ${webDetection.fullMatchingImages.length}`
            );
            webDetection.fullMatchingImages.forEach(image => {
                console.log(`  URL: ${image.url}`);
                console.log(`  Score: ${image.score}`);
            });
        }

        if (webDetection.partialMatchingImages.length) {
            console.log(
                `Partial matches found: ${webDetection.partialMatchingImages.length}`
            );
            webDetection.partialMatchingImages.forEach(image => {
                console.log(`  URL: ${image.url}`);
                console.log(`  Score: ${image.score}`);
            });
        }

        if (webDetection.webEntities.length) {
            console.log(`Web entities found: ${webDetection.webEntities.length}`);
            webDetection.webEntities.forEach(webEntity => {
                console.log(`  Description: ${webEntity.description}`);

                let score = (webEntity.score).toFixed(2)*100+ "%"

                console.log(`  Score: ${score}`);
            });
        }
    })
    .catch(err => {
        console.error('ERROR:', err);
    });