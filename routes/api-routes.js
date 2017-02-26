var db = require('../models');
//====FIREBASE admin initialization=====
var admin = require('firebase-admin');
var firebase = require('firebase');
// var firebaseui = require('firebaseui');

var serviceAccount = require("../firebaseServiceAccoutKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://Grow-with-Friends.firebaseio.com"
});

module.exports = function(app) {
    //==========creating new user account==========
    app.post("/sign-up", function(req, res) {
        var data = req.body;
        db.User.findOrCreate({where: {
            $or: [
                { user_name: data.username},
                {email: data.email}
            ]}, defaults: {
            first_name: data.first,
            last_name: data.last,
            user_name: data.username,
            password: data.password,
            email: data.email,
            address: data.address
        }}).spread(function(user, created) {
            //check to see if it exists already
            //redirect user to main page
            console.log("created: " + created);
            if(created) {
                console.log("routing to home page");
                res.send(created)
            } else {
                console.log("username exists, try again");
                res.send(created);
            }
        })
        //=======for FIREBASE Authingtication adding user=========
        // admin.auth().createUser({
        //     uid:data.username,
        //     email: data.email,
        //     emailVerified: false,
        //     password: data.password,
        //     displayName: data.first + data.last,
        //     disabled: false
        //     })
        //     .then(function(userRecord) {
        //         // See the UserRecord reference doc for the contents of userRecord.
        //         console.log("Successfully created new user:", userRecord.uid);
        //     })
        //     .catch(function(error) {
        //         console.log("Error creating new user:", error);
        // });
    });
    //====================login===================
    app.post("/log-in", function(req, res) {
        var data = req.body;
        db.User.findOne({ where: { email: data.email, password: data.password}})
            .then(function(response) {
                if(response === null) {
                    res.send(false);
                } else {
                    res.send(response);
                }
            })
    });
    //================User Selects SKILLS====================
    app.get('/api/create-profile/:key', function(req, res) {
        //key variable stores username of user
        var key = req.params.key;
        //========RAUL WORK HERE==========
        //---create sequelize function that sends data into mysql database into ****CORRECT TABLE****-----

    });
    //=================Unique User HOME PAGE================
    app.get('/api/home/:key', function(req, res) {
        var key = req.params.key
        //----query data for this specific profile-----
        //----display data via handlebars----
        db.User.findOne({where: {user_name: key}})
            .then(function(response) {
                console.log(response.dataValues)
                res.render('user-home', {info: response.dataValues})
            })
    });
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