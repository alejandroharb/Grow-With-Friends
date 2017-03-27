var admin = require("firebase-admin");
var firebase = require('firebase');

var serviceAccount = require("./Grow-with-Friends-firebaseServiceAccountKey.json");
//initialize firebase Admin
var admin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "grow-with-friends.firebaseapp.com"
});

var config = ({
    apiKey: "AIzaSyBAWx3ZLy8j86QkkL3kq3R92T7S1XE8mgg",
    authDomain: "grow-with-friends.firebaseapp.com",
    databaseURL: "https://grow-with-friends.firebaseio.com",
    storageBucket: "grow-with-friends.appspot.com",
    messagingSenderId: "910838171447"
});

firebase.initializeApp(config);
// module.exports = admin;
module.exports = firebase;