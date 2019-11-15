const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
// const fileName = 'Local image file, e.g. /path/to/image.png';

// Performs property detection on the local file
client
    .imageProperties('E:\\instagram_pictures\\Screenshot 2018-03-14 at 11.17.50.png')
    .then(results => {
        const properties = results[0].imagePropertiesAnnotation;
        const colors = properties.dominantColors.colors;
        colors.forEach(color => console.log(color));
    })
    .catch(err => {
        console.error('ERROR:', err);
    });