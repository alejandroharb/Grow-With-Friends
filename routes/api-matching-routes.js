var db = require('../models');
var geocoder = require('geocoder');
var distance = require('google-distance');
distance.apiKey = 'AIzaSyAi_tpNW81fkYbZNdVNWPzUhF68d4se-0Y';

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
                include: [db.User]
                }).then(function (dbGolf) {
               
                    var distanceArray = [];
                    var i = 0;
                    gatherDistData(i);
                    function completeMatch(array){
                        var userRating;
                        for(var i = 0; i < array.length; i++) {
                            if(array[i].username === username) {
                                userRating = array[i].rating;
                                break;
                            }
                        }
                        var filteredArr = array.filter(function(obj) {
                            if(obj.username === username || obj.rating !== userRating) {
                                return false;
                            } else {return true};
                        })
                        console.log(filteredArr)
                        res.json(filteredArr)
                    }
                    function gatherDistData(index){
                        // console.log("startPoint: " + startPoint)
                        var destination = dbGolf[index].dataValues.User.address;
                        var user = dbGolf[index].dataValues.user_name;
                        var rating = dbGolf[index].dataValues.experience_rating;
                        var origin = address;
                        var userDistanceData = {username: user, rating: rating}
                        //google npm
                        //gets distance between two locations
                        distance.get(
                                {
                                    origin: origin,
                                    destination: destination,
                                    mode: "driving",
                                    metric: "imperial"
                                },
                                function(err, data) {
                                    if(err) throw err;
                                    
                                    //converting distance from feet into miles
                                    dist = data.distanceValue * 0.000189394;
                                    //adding distance as key in object to be send
                                    //maintaining distance to 2 decimal places
                                    userDistanceData.distance = dist.toFixed(2);
                                    distanceArray.push(userDistanceData);
                                    // console.log("username: " + user);
                                    // console.log("index: " + index);
                                    // console.log("distance: " + dist);
                                    // console.log("====array====")
                                    // console.log(distanceArray)
                                    // console.log("distance: " + distance)
                                    // userDistanceData.dist = getDistance(origin, destination)
                                    // distanceArray.push(userDistanceData);
                                    index++;
                                    if(index < dbGolf.length) {
                                        gatherDistData(index)
                                    } else {
                                        // console.log(distanceArray);
                                        distanceArray.sort(function(a,b) {
                                            return a.distance - b.distance;
                                        })
                                        // console.log(distanceArray)
                                        completeMatch(distanceArray)
                                    }
                                })
                    }
                })
            })

            
        })
        
    })
}
// function getDistance(startLoc, endLoc, cb) {
//     // console.log("startLoc: " + startLoc)
//     // console.log("endLoc: " + endLoc)
//     var dist = 
//     return dist;
// }


function findCity(loc, cb) {
    geocoder.geocode(loc, function (err, data) {
        // console.log(data);
        var locData = data.results[0].address_components;
        for (var i = 0; i < locData.length; i++) {
            if (locData[i].types[0] === "locality") {
                city = locData[i].long_name;
                console.log("=====city variable======")
                // console.log(city)
                cb()
                break;
            }
        }

    })
}

findCity('3918 atascocita rd', function(){})