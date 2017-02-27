var db = require('../models');
var pictures = require('./pictures.js');
var geocoder = require('geocoder');
//=====geocoder test=========
var myLocation = '3918 atascocita rd, Atascocita, Texas 77396';
geocoder.geocode(myLocation, function (err, data) {
    console.log("=====geocode data========");
    console.log(data.results[0].address_components);
})
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
        // =======for FIREBASE Authingtication adding user=========
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
        res.render('create-profile', {username: key})
        
    });
    //----routing for all skills chosen---
    app.post('/api/choices/:skill/:user', function (req, res) {
        //collect skill variable and user_name
        var skill = req.params.skill;
        var username = req.params.user;
        var data = req.body;
        var city = '';
        //first get location data from user
        db.User.findOne({ where: { user_name: username } })
            .then(function (response) {
            
        })
        if (skill === "golf") {
            db.Golf.create({
                user_name: username,
                year_experience: data.years,
                experience_rating: data.experienceRating,
                city: city //from data query
            })
        }
    })
    //=================Unique User HOME PAGE================
    app.get('/api/home/:key', function(req, res) {
        var key = req.params.key
        //---adding image source for displaying----
        var userData = {};
        userData.image = "assets/img/" + key + ".jpg";
        //----query data for this specific profile-----
        db.User.findOne({where: {user_name: key}})
            .then(function(response) {
                userData.basicInfo = response.dataValues;
                res.render('user-home', {info: userData})
            })
        
    });
    // app.post('/pictures/upload', pictures);

}