var db = require('../models');
var moment = require('moment');
var geocoder = require('geocoder');

// ===========FIREBASE============
var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyBAWx3ZLy8j86QkkL3kq3R92T7S1XE8mgg",
    authDomain: "<grow-with-friends.firebaseapp.com",
    databaseURL: "https://grow-with-friends.firebaseio.com",
    storageBucket: "<grow-with-friends.appspot.com",
};

firebase.initializeApp(config);
//reference to database
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
        console.log("===firebase golf data being sent====")
        console.log(data)
        //get current date stamp
        var date = moment().format('YYYY-MM-DD, h:mm:ss a');
        //creating score object
        var score = { score: data.score }
        //ref variable holds FIREBASE node structure
        var ref = database.ref("Users/" + data.username + "/" + skill + "/" + date);
        //writing into database at specific reference
        ref.set(score);
    });
    //============Querying Data FROM Firebase to Chart====================
    app.get('/get-data/:activityModal/:user', function (req, res) {
        var username = req.params.user;
        var activityModal = req.params.activityModal;
        // console.log("activityModal: " + activityModal);
        // console.log("userName: " + username);
        var ref = database.ref("Users/" + username + "/" + activityModal);
        var scoreArray = [];
        var dateArray = [];
        ref.once('value').then(function (snapshot) {
            var dataArray = snapshot.val();
            console.log("======data======")
            // console.log(dataArray)
            // console.log(Object.keys(dataArray));
            // selecting MM/DD from each; pushing dates/moments(x-axis) for chart
            for (i in dataArray) {
              console.log(i);
              dateArray.push(i.slice(5,10));
            }
            console.log(dateArray);
            // *********************
            // pushing scores(y-axis) for chart
            snapshot.forEach(function(childSnapshot) {
              scoreArray.push(parseInt(childSnapshot.val().score));
            });
            console.log(scoreArray);
            // *********************
            // displays activity
            var activity = snapshot.key;
            console.log(activity);
            // user activity for graph
            var dataActivity = [dateArray, activity, scoreArray]

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
        var city = '';
        //first get location data from user
        db.User.findOne({ where: { user_name: username } })
            .then(function (response) {
                console.log("userData response");
                console.log(response.datavalues.address)
                address = response.datavalues.address;
                //function uses geocoder to convert user's address into a city
                city = findCity(address);
                //------storing data depending on which skill is being submitted----
                switch (skill) {
                    case "golf":
                        addSkillData(Golf);
                        break;
                    case "guitar":
                        addSkillData(Guitar);
                        break;
                }
            })

    });
}
function addSkillData(model) {
    db.model.create({
        user_name: username,
        year_experience: data.years,
        experience_rating: data.experienceRating,
        city: city
    }).then(function () {
        res.sendStatus(200);
     });
}
function findCity(loc) {
    geocoder.geocode(loc, function (err, data) {
        console.log("=====geocode city========");
        var locData = data.results[0].address_components;
        var city = getCityName(locData);;
        console.log(city);
    })
}
function getCityName(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].types[0] === "locality") {
            return data[i].long_name;
        }
    }
}
