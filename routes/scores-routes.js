var db = require('../models');
var moment = require('moment');
// ===========FIREBASE============
var admin = require("firebase-admin");
var firebase = require("./../config/firebaseConfig.js");

var database = firebase.database();

module.exports = function (app) {
    //==============Writing data to FIREBASE==============
    app.post('/score/:skill', function (req, res) {
        var skill = req.params.skill;
        var data = req.body;
        var username = data.username;

        //get current date stamp
        var date = moment().format();
        //creating score object
        var score = {
            score: data.score,
            time: date
        }
        //ref variable holds FIREBASE node structure
        var ref = database.ref("Users/" + data.username + "/" + skill + "/" + date);
        //writing into database at specific reference
        ref.set(score);
        //writing database general activity of all users
        db.User.findOne({ where: { user_name: username } })
            .then(function (response) {

                var name = response.first_name;
                var image = response.image;

                if (skill === "golf") {
                    userActivity = name + " just added a golf score of " + data.score + "!";
                } else if (skill === "guitar") {
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
            // selecting MM/DD from each; pushing dates/moments(x-axis) for chart
            for (i in dataArray) {
                dateArray.push(i.slice(5, 10));
            }
            // *********************
            // pushing scores(y-axis) for chart
            snapshot.forEach(function (childSnapshot) {
                scoreArray.push(parseInt(childSnapshot.val().score));
                emptyLabels.push("");
                // cummulative score array
                partial += parseInt(childSnapshot.val().score);
                sumScore.push(partial);
            });
            // *********************
            // displays activity
            var activity = snapshot.key;

            // user activity for graph
            var dataActivity = [dateArray, activity, scoreArray, sumScore, emptyLabels]

            res.send(dataActivity);
        });
    });
}