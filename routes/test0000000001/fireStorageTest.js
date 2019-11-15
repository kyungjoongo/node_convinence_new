//Create a root reference

var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyAZMDKdP3GqDkFu6nkC8hAdmhol8ZfXVgg",
    authDomain: "proverb-best.firebaseapp.com",
    databaseURL: "https://proverb-best.firebaseio.com",
    projectId: "proverb-best",
    storageBucket: "proverb-best.appspot.com",
    messagingSenderId: "31566108418"
};

firebase.initializeApp(config);

var fireBaseStorage=  firebase.storage();

var storageRef = fireBaseStorage().ref();

// Create a reference to 'mountains.jpg'
var mountainsRef = storageRef.child('mountains.jpg');

// Create a reference to 'images/mountains.jpg'
var mountainImagesRef = storageRef.child('images/mountains.jpg');

// While the file names are the same, the references point to different files
mountainsRef.name === mountainImagesRef.name            // true
mountainsRef.fullPath === mountainImagesRef.fullPath    // false