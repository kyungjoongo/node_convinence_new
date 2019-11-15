

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





firebase.firestore().collection('test001').onSnapshot((querySnapshot) => {

    const results = [];
    querySnapshot.forEach((doc) => {

        let documentData = doc.data();
        /*console.log('name--->',documentData.name);
        console.log('name--->',doc.id);*/
        results.push({
            key: doc.id,
            id: documentData.id,
            name: documentData.name,
        });
    });


    console.log('live--->',results);

})