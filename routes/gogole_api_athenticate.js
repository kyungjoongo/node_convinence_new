// Imports the Google Cloud client library.
const Storage = require('@google-cloud/storage');

// Instantiates a client. Explicitly use service account credentials by
// specifying the private key file. All clients in google-cloud-node have this
// helper, see https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/latest/guides/authentication
const storage = Storage({
    keyFilename: './youngmi12345-f793603ead1e.json'
});

// Makes an authenticated API request.
storage.getBuckets().then((results) => {
    const buckets = results[0];
    console.log('Buckets:');
    buckets.forEach((bucket) => {


    });


})



