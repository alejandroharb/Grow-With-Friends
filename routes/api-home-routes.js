var db = require('../models');
var moment = require('moment');
var geocoder = require('geocoder');
var Promise = require("bluebird");

// ===========FIREBASE============
var admin = require("firebase-admin");
var firebase = require("./../config/firebaseConfig.js");

var database = firebase.database();

module.exports = function (app) {
    //=================Unique User HOME PAGE================
    app.get('/api/home/:key', function (req, res) {
        var key = req.params.key

        //---adding image source for displaying----
        var userData = {};
        //----query data for this specific profile-----
        db.User.findOne({ where: { user_name: key } })
            .then(function (response) {
                userData.basicInfo = response.dataValues;
                res.render('user-home', { info: userData })
            })

    });
    //==============Writing data to FIREBASE==============
    app.post('/score/:skill', function (req, res) {
        var skill = req.params.skill;
        var data = req.body;
        var username = data.username;
        console.log("===firebase golf data being sent====")
        console.log(data)
        //get current date stamp
        var date = moment().format();
        //creating score object
        var score = {
          score: data.score,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        }
        //ref variable holds FIREBASE node structure
        var ref = database.ref("Users/" + data.username + "/" + skill + "/" + date);
        //writing into database at specific reference
        ref.set(score);
        //writing database general activity of all users
        db.User.findOne({ where: { user_name: username } })
            .then(function(response) {

                var name = response.first_name;
                var image = response.image;
                
                if(skill === "golf") {
                    userActivity = name + " just added a golf score of " + data.score + "!";
                } else if (skill === "guitar"){
                    userActivity = name + " just logged " + data.score + " hours for guitar!"
                } else {
                    userActivity = name + " just logged " + data.score + " hours for Spanish!"
                }
                var activityData = {
                    image: image,
                    userActivity: userActivity
                };
                var activityRef = database.ref("userActivity");
                activityRef.push(activityData);
            })
        
        

    });
    // //==============querying for user activity data================
    // app.get('/users-activity', function(req,res) {
    //     var activityArray = [];
    //     var ref = database.ref("userActivity/");
    //     ref.once('value', function(snapshot) {
    //         snapshot.forEach(function(childSnapshot) {
    //             var childData = childSnapshot.val();
    //             activityArray.push(childData);
    //         })
    //         res.json(activityArray)
    //     })
    // })
    //============Querying Data FROM Firebase to Chart====================
    app.get('/get-data/:activityModal/:user', function (req, res) {
        var username = req.params.user;
        var activityModal = req.params.activityModal;
        // query database
        var ref = database.ref("Users/" + username + "/" + activityModal);
        var scoreArray = [];
        var dateArray = [];
        var sumScore = [];
        var partial = 0;
        var emptyLabels = [];
        ref.once('value').then(function (snapshot) {
            var dataArray = snapshot.val();
            console.log("======data======");
            // selecting MM/DD from each; pushing dates/moments(x-axis) for chart
            for (i in dataArray) {
                console.log(i);
                dateArray.push(i.slice(5, 10));
            }
            console.log("dateArray: " + dateArray);
            // *********************
            // pushing scores(y-axis) for chart
            snapshot.forEach(function (childSnapshot) {
                scoreArray.push(parseInt(childSnapshot.val().score));
                emptyLabels.push("");
                // cummulative score array
                partial += parseInt(childSnapshot.val().score);
                sumScore.push(partial);
            });
            console.log("score: " + scoreArray);
            console.log("sum: " + sumScore);
            // *********************
            // displays activity
            var activity = snapshot.key;

            // user activity for graph
            var dataActivity = [dateArray, activity, scoreArray, sumScore, emptyLabels]

            res.send(dataActivity);
        });
    });
    app.get('/test', function (req, res) {
        res.render('test');
    });
    //============USER SELECTS THEIR SKILLS==============
    app.post('/api/choices/:skill/:user', function (req, res) {
        //collect skill variable and user_name
        var skill = req.params.skill;
        var username = req.params.user;
        var data = req.body;
        //first get location data from user
        db.User.findOne({ where: { user_name: username } })
            .then(function (response) {
                console.log("userData response");
                console.log(response.dataValues)
                address = response.dataValues.address;
                userId = response.dataValues.id;
                userImgPath = response.dataValues.image;
                //function uses geocoder to convert user's address into a city
                //custom callback function used
                findCity(address, function () {
                    //------storing data depending on which skill is being submitted----
                    switch (skill) {
                        case "golf":
                            db.Golf.create({
                                UserId: userId,
                                user_name: username,
                                year_experience: data.year_experience,
                                experience_rating: data.experience_rating,
                                city: city
                            }).then(function (data) {
                                res.json(data);
                            });
                            break;
                        case "guitar":
                            db.Guitar.create({
                                UserId: userId,
                                user_name: username,
                                year_experience: data.year_experience,
                                experience_rating: data.experience_rating,
                                city: city
                            }).then(function (data) {
                                res.json(data);
                            });
                            break;
                        // case "Spanish":
                        //     db.Guitar.create({
                        //         UserId: userId,
                        //         user_name: username,
                        //         year_experience: data.year_experience,
                        //         experience_rating: data.experience_rating,
                        //         city: city
                        //     }).then(function (data) {
                        //         res.json(data);
                        //     });
                        //     break;
                        // case "Chess":
                        //     db.Guitar.create({
                        //         UserId: userId,
                        //         user_name: username,
                        //         year_experience: data.year_experience,
                        //         experience_rating: data.experience_rating,
                        //         city: city
                        //     }).then(function (data) {
                        //         res.json(data);
                        //     });
                        //     break;
                    }
                })
            })

    });
}
// function addSkillData(model) {}
function findCity(loc, cb) {
    geocoder.geocode(loc, function (err, data) {
        console.log("=====geocode function running========");
        var locData = data.results[0].address_components;
        for (var i = 0; i < locData.length; i++) {
            if (locData[i].types[0] === "locality") {
                city = locData[i].long_name;
                console.log("=====city variable======")
                console.log(city)
                cb()
                break;
            }
        }

    })
}

// function getCityName(data) {

// }