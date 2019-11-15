var express = require('express');
var router = express.Router();

var firebase = require('firebase');
var Promise = require('bluebird');
const {Storage} = require('@google-cloud/storage');
const settings = {timestampsInSnapshots: true};

var config = {
    apiKey: "AIzaSyAZMDKdP3GqDkFu6nkC8hAdmhol8ZfXVgg",
    authDomain: "proverb-best.firebaseapp.com",
    databaseURL: "https://proverb-best.firebaseio.com",
    projectId: "proverb-best",
    storageBucket: "proverb-best.appspot.com",
    messagingSenderId: "31566108418"
};
firebase.initializeApp(config);

router.get('/firebase_write', function (req, res, next) {

    var id = 'sdlkflskdlfdsflksdlfk'

    res.render('firebase_write', {id: id});
});

router.get('/proverb_image_upload_form', function (req, res, next) {

    var id = 'sdlkflskdlfdsflksdlfk'

    res.render('proverb_image_upload_form', {id: id});
});

//firestore_image_upload
router.post('/proverb_image_upload', function (req, res, next) {

    var filename = req.files.file1.name;

    let sampleFile = req.files.file1;

    const home_dir = '/home/ubuntu/node_convinience_rest_brandnewnewnew/'
    const local_home_dir = '/Users/gilzako/node_pjt/node_convinience_rest_brandnewnewnew/'


    let fullFilePath = home_dir + 'proverb_images/' + filename;

    sampleFile.mv(fullFilePath, function (err) {
        if (err)
            return res.status(500).send(err);

        else {
            console.log('live--->', filename);

            var storage = new Storage({
                projectId: 'proverb-best',
                keyFilename: home_dir+ '/routes/firebase_route/proverb-best-274f02fd1759.json'
            })

            var myBucket = storage.bucket('proverb-best.appspot.com')

            let localFileLocation = './temp_image16.jpg'
            myBucket.upload(fullFilePath, (res) => {
                console.log('live---complete' + res);


            })
        }

    });
    //https://firebasestorage.googleapis.com/v0/b/proverb-best.appspot.com/o/abstract-background-design_1297-84.jpg?alt=media&token=442b0e1f-ddc6-4bf5-919f-34a77d99a6fd
    //https://firebasestorage.googleapis.com/v0/b/proverb-best.appspot.com/o/abstract-background-design_1297-84.jpg?alt=media&token=bafdc767-0d54-4998-a157-42b29fdf4559
    let fileLocation = 'https://firebasestorage.googleapis.com/v0/b/proverb-best.appspot.com/o/' + req.files.file1.name + '?alt=media&token=442b0e1f-ddc6-4bf5-919f-34a77d99a6fd'

    console.log('fileLocation===>--->', fileLocation);

    firebase.firestore().collection('images').add({
        image: fileLocation,
        date: new Date(),
    }).then((docRef) => {


    }).catch((err) => {

        console.log('live--->', err);
    })


    setTimeout(() => {
        // res.render('proverb_image_upload_form', {upload_file_name: fileLocation});

        res.redirect('/proverb_image_upload_form?upload_file_name=' + fileLocation);
    }, 1000)


});

router.get('/image_json', function (req, res, next) {


    firebase.firestore().collection("images").orderBy("date", "desc").onSnapshot((querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {

            let firebaseDataOne = doc.data();
            /*console.log('name--->',documentData.name);
            console.log('name--->',doc.id);*/
            results.push({
                key: doc.id,
                image: firebaseDataOne.image,
            });
        });

        res.json(results);
    })
});


router.get('/proverb_json', function (req, res, next) {


    firebase.firestore().collection("test001").orderBy("date", "desc").onSnapshot((querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {

            let documentData = doc.data();
            /*console.log('name--->',documentData.name);
            console.log('name--->',doc.id);*/
            results.push({
                key: doc.id,
                date: documentData.date,
                title: documentData.title.trim(),
            });
        });


        console.log('live--->', results);

        res.json(results);

    })

});

router.get('/proverb_write', function (req, res, next) {

    var id = 'sdlkflskdlfdsflksdlfk'

    res.render('proverb_write', {id: id});

});

router.get('/proverb_modify_form', function (req, res, next) {

    var id = req.query.id; // extra


    const ref = firebase.firestore().collection('test001').doc(id);

    ref.get().then((doc) => {
        if (doc.exists) {
            const board = doc.data();
            /*  this.setState({
                  key: doc.id,
                  title: board.title,
                  description: board.description,
                  author: board.author
              });*/


            console.log('title--->', board.title);

            res.render('proverb_modify_form', {id: id, title: board.title});

        } else {
            console.log("No such document!");
        }
    });


});


module.exports = router;
