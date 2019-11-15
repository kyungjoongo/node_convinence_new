/*

const keyFilename="/Users/gilzako/node_pjt/node_convinience_rest_brandnewnewnew/routes/firebase_route/google-services.json"; //replace this with api key file
const projectId = "my-project-id-should-go-here" //replace with your project id
const bucketName = `gs://rich-labs-app.appspot.com`;

const gcs = require('@google-cloud/storage')({
    projectId,
    keyFilename
});

const bucket = gcs.bucket(bucketName);*/



// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const bucketName = 'bucket-name';

async function createBucket() {
    // Creates the new bucket
    await storage.createBucket(bucketName);
    console.log(`Bucket ${bucketName} created.`);
}

createBucket();
