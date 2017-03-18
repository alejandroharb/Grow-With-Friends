
var admin = require("firebase-admin");
var serviceAccount = require("./Grow-with-Friends-firebaseServiceAccountKey.json");
//initialize firebase Admin
var admin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "grow-with-friends.firebaseapp.com"
});
//initialize firebase
// var firebaseInit = firebase.initializeApp({
//     apiKey: "AIzaSyBAWx3ZLy8j86QkkL3kq3R92T7S1XE8mgg",
//     authDomain: "grow-with-friends.firebaseapp.com",
//     databaseURL: "https://grow-with-friends.firebaseio.com",
//     storageBucket: "grow-with-friends.appspot.com",
//     messagingSenderId: "910838171447"
// });
//export initialized variable
// module.exports = firebaseInit;
module.exports = admin;