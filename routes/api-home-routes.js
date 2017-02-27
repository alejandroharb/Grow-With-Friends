var db = require('../models');
var moment = require('moment');

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

module.exports = function(app) {
    //==============Writing data to FIREBASE==============
    app.post('/score/:skill', function(req, res) {
        var skill = req.params.skill;
        var data = req.body;

        //get current date stamp
        var date = moment().format();
        //creating score object
        var score = {score: data.score}
        //ref variable holds FIREBASE node structure
        var ref = database.ref("Users/" + data.username + "/" + skill + "/" + date);
        //writing into database at specific reference
        ref.set(score);
    });
    //=================Querying Data FROM Firebase to Chart====================
    app.get('/get-golf-data/:user', function(req, res) {
        var username = req.params.user;
        console.log("userName: " + username);
        var ref = database.ref("Users/" + username + "/golf")
        ref.once('value').then(function(snapshot){
            var dataArray = snapshot;
            console.log("======data======")
            console.log(dataArray)
            res.send(dataArray);
        })
    })
}