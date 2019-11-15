var Promise = require('bluebird');
const {Storage} = require('@google-cloud/storage');
//const storage = new Storage();
var storage =new Storage({
    projectId: 'chungwade-minwon',
    keyFilename: '/Users/gilzako/node_pjt/node_convinience_rest_brandnewnewnew/routes/firebase_route/chungwade-minwon-16472f384efd-accountkey.json'
})

// https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/bucket
var myBucket = storage.bucket('chungwade-minwon.appspot.com')

// check if a file exists in bucket
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/file?method=exists
/*var file = myBucket.file('myImage.png')
file.existsAsync()
    .then(exists => {
        if (exists) {
            // file exists in bucket
        }
    })
    .catch(err => {
        return err
    })*/


// upload file to bucket
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/bucket?method=upload
let localFileLocation = './temp_image16.jpg'
myBucket.upload(localFileLocation, (res)=>{
    console.log('live---complete'+ res);
})



// get public url for file
/*
var getPublicThumbnailUrlForItem = file_name => {
    return `https://storage.googleapis.com/${BUCKET_NAME}/${file_name}`
}*/
