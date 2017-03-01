var db = require('../models');
var geocoder = require('geocoder');
var distance = require('google-distance');

module.exports = function (app) {
    //==========USER MATCHING==========
    app.get('/match/:skill/:user', function (req, res) {
        var skill = req.params.skill;
        var username = req.params.user;
        db.User.findOne({where:{user_name: username}})
        .then(function(data) {
            var address = data.dataValues.address
            //use geocode function with callback to find city synchronously
            findCity(address, function() {
                db.Golf.findAll({
                where: { city: city },
                include: [{
                    model: db.Golf,
                    // where: {experience_rating: }
                }]
                }).then(function (data) {
                    ////do matching work here!!!!

                    res.json(data);
                })
            })

            
        })
        
    })
}
function findCity(loc, cb) {
    geocoder.geocode(loc, function (err, data) {
        console.log(data);
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

findCity('3918 atascocita rd', function(){})