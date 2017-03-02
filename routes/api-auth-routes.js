var db = require('../models');
var pictures = require('./pictures.js');
var geocoder = require('geocoder');


module.exports = function (app) {
    //==========creating new user account==========
    app.post("/sign-up", function (req, res) {
        var data = req.body;
        var address = data.address;
        var city = geocoder.geocode(address, function (err, data) {
            console.log("=====geocode city========");
            var locData = data.results[0].address_components;
            for (var i = 0; i < locData.length; i++) {
                if (locData[i].types[0] === "locality") {
                    return locData[i].long_name;
                }
            }
            

        })
        console.log(city);
        db.User.findOrCreate({
            where: {
                $or: [
                    { user_name: data.username },
                    { email: data.email }
                ]
            }, defaults: {
                first_name: data.first,
                last_name: data.last,
                user_name: data.username,
                password: data.password,
                email: data.email,
                address: data.address,
                city: city,
                image: "blank-person.png"
            }
        }).spread(function (user, created) {
            //check to see if it exists already
            //redirect user to main page
            console.log("created: " + created);
            if (created) {
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
    app.post("/log-in", function (req, res) {
        var data = req.body;
        db.User.findOne({ where: { email: data.email, password: data.password } })
            .then(function (response) {
                if (response === null) {
                    res.send(false);
                } else {
                    res.send(response);
                }
            })
    });
    //================User Selects SKILLS====================
    app.get('/api/create-profile/:key', function (req, res) {
        //key variable stores username of user
        var key = req.params.key;
        //========RAUL WORK HERE==========
        //---create sequelize function that sends data into mysql database into ****CORRECT TABLE****-----
        var data = req.body;

        db.Golf.create({
            user_name: data.user_name,
            year_experience: data.year_experience,
            experience_rating: data.experience_rating
        }).then(function (response) {
            res.json(response);
        });
    });


    // app.post('/pictures/upload', pictures);

}
