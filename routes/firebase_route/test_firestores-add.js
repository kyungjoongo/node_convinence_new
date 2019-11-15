

var firebase = require('firebase');
var firestore = require('firebase/firestore')

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


/*

firebase.firestore().collection('test001').add({
    id: 232323,
    title: 'sdflksdflk고경준천재009029123123123123123--->'
}).then((docRef)=>{


})*/


var today = new Date();
/*var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();*/

//today = mm + '/' + dd + '/' + yyyy;


console.log('live--->',today)