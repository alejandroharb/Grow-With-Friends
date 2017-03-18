var admin = require("firebase-admin");
// var serviceAccount = require("<path/to/serviceAccountKey.json>");
//firebase initialization
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
});


//export initialized variable
module.exports = admin;
/*
To test out the software:
1. enter your own firebase keys
2. change this file name to firebaseConfig.js
*/
