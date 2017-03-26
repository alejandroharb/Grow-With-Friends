var db = require('../models');
var pictures = require('./pictures.js');
var geocoder = require('geocoder');
var admin = require("firebase-admin");
var firebase = require('./../config/firebaseConfig.js');

module.exports = function (app) {
    //==========creating new user account==========
    app.post("/sign-up", function (req, res) {
        var data = req.body;
        var email = data.email;
        var password = data.password;
        admin.auth().createUser({
            uid: data.username,
            email: email,
            emailVerified: false,
            password: password,
            disabled: false
        })
            .then((userRecord) => {
                console.log(userRecord)
                res.sendStatus(200);
            })
            .catch((error) => {
                console.log("Error creating new user:", error);
                res.send(error)
            })
    });
    app.post('/new-profile', function (req, res) {
        var data = req.body;
        var address = data.address;
        var city = geocoder.geocode(address, function (err, data) {
            // console.log("=====geocode city========");
            var locData = data.results[0].address_components;
            for (var i = 0; i < locData.length; i++) {
                if (locData[i].types[0] === "locality") {
                    return locData[i].long_name;
                }
            }
        })
        db.User.findOrCreate({
            where: { user_name: data.username },
            defaults: {
                first_name: data.first,
                last_name: data.last,
                user_name: data.username,
                address: data.address,
                city: city,
                image: "blank-person.png",
                description: data.description
            }
        }).spread(function (user, created) {
            //check to see if it exists already
            //redirect user to main page
            // console.log("created: " + created);
            if (created) {
                console.log("user data created!")
                console.log(created)
                //send success status, and user's entered info
                res.status(200).send(created);
            } else {
                console.log("Error in user data entering!");
                res.status(400).send("Oops! Well this is embarassing. We've encountered an error in data process. Come back soon, as we're liking working on fixing this.");
            }
        })
    })
    //====================login===================
    app.post("/log-in", function (req, res) {
        var data = req.body;
        var email = data.email;
        var password = data.password;

        var uid = email;

        admin.auth().createCustomToken(uid)
            .then(function (customToken) {
                // Send token back to client
            })
            .catch(function (error) {
                console.log("Error creating custom token:", error);
            });
        // db.User.findOne({ where: { email: data.email, password: data.password } })
        //     .then(function (response) {
        //         if (response === null) {
        //             res.send(false);
        //         } else {
        //             res.send(response);
        //         }
        //     })
    });
    //================User Selects SKILLS====================
    app.get('/api/create-profile/:key', function (req, res) {
        //key variable stores username of user
        var key = req.params.key;
        var data = req.body;

        db.Craft.create({
            user_name: data.user_name,
            year_experience: data.year_experience,
            experience_rating: data.experience_rating
        }).then(function (response) {
            res.json(response);
        });
    });
    //============set USER session===========
    app.post('/user/authenticate', function (req, res) {
        req.session.uid = req.body.uid;
        console.log("Setting session uid ", req.session.uid);
        res.end();
    });
    app.get('/user/authenticate/signout', function (req, res) {
        console.log("destroying session for signing out")
        req.session.destroy(function (err) {
            console.log(err)
            res.end();
        })
    })
    //=============Route User Home + Authenticate credentials with Session==============
    app.get('/home/:id', function (req, res) {
        console.log("I should get the session id here ", req.session.uid);
        if (req.session.uid === req.params.id) {
            console.log("user has been authenticated");
            //---adding image source for displaying----
            var userData = {};
            //----query data for this specific profile-----
            db.User.findOne({ where: { user_name: req.params.id } })
                .then(function (response) {
                    userData.basicInfo = response.dataValues;
                    res.render('user-home', { info: userData });
                })
        } else {
            res.render("unauthorized", {title:"Unauthorized Access Page", layout: "front-page"});
        }
    })
}
