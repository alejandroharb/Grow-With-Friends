var admin = require("firebase-admin");

var serviceAccount = require("./Grow-with-Friends-firebaseServiceAccountKey.json");
//initialize firebase Admin
var admin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "grow-with-friends.firebaseapp.com"
});

module.exports = admin;