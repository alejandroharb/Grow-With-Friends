var db = require('../models');


//====FIREBASE admin initialization=====
// var admin = require('firebase-admin');
// var firebase = require('firebase');


module.exports = function(app) {
	//================FIREBASE Authentication=================
    app.post('/firebaseAuth', function(req, res) {
        var id_token = req.body;
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(id_token);
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).done(function(response) {
            console.log(firebase.User)
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
            console.log('Email already associated with another account.');
            // Handle account linking here, if using.
            } else {
                console.error(error);
            }
        });
    })
}