// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
// const fileName = 'Local image file, e.g. /path/to/image.png';

client.faceDetection('E:\\instagram_pictures\\Screenshot 2018-03-14 at 11.17.50.png')
    .then(results => {
        const faces = results[0].faceAnnotations;


        let arrResult= [];

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
                'smile' : face.joyLikelihood,
                'anger' :face.angerLikelihood,
                'sorrow' :face.sorrowLikelihood,
                'nolram' :face.surpriseLikelihood
            })


        });

        console.log(arrResult)
    })
    .catch(err => {
        console.error('ERROR:', err);
    });