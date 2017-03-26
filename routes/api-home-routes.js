var db = require('../models');
var moment = require('moment');
var geocoder = require('geocoder');
var Promise = require("bluebird");

module.exports = function (app) {
    app.get('/crafts/options/:user', (req, res) => {
        var username = req.params.user;
        console.log("username: " + username )
        db.User.findOne({
            where: { user_name: username },
            include: [db.Craft]
        })
            .then(function (dbUser) {
                res.render("partials/craftMatchPartial", {
                    crafts: dbUser.Crafts,
                    layout: false
                });
            })
    })
    //============USER SELECTS THEIR SKILLS==============
    app.post('/api/choices/:craft/:user', function (req, res) {
        //collect skill variable and user_name
        var craft = req.params.craft;
        var username = req.params.user;
        var data = req.body;
        //---(1) get location data from user---
        db.User.findOne({ where: { user_name: username } })
            .then(function (response) {
                address = response.dataValues.address;
                userId = response.dataValues.id;
                userImgPath = response.dataValues.image;
                //function uses geocoder to convert user's address into a city
                //custom callback function used
                findCity(address, function () {
                    //--- (2) save craft----
                    db.Craft.create({
                        UserId: userId,
                        user_name: username,
                        craft: craft,
                        year_experience: data.year_experience,
                        experience_rating: data.experience_rating,
                        city: city
                    }).then(function (data) {
                        res.json(data);
                    });
                })
            })

    });
}

function findCity(loc, cb) {
    geocoder.geocode(loc, function (err, data) {
        var locData = data.results[0].address_components;
        for (var i = 0; i < locData.length; i++) {
            if (locData[i].types[0] === "locality") {
                city = locData[i].long_name;
                cb()
                break;
            }
        }

    })
}

