var db = require('../models');
var geocoder = require('geocoder');
var distance = require('google-distance');
distance.apiKey = 'AIzaSyAi_tpNW81fkYbZNdVNWPzUhF68d4se-0Y';

module.exports = function (app) {
    app.get('/crafts/match/options/:user', function (req, res) {
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
    //==========USER MATCHING==========
    app.get('/match/:craft/:user', function (req, res) {
        var craft = req.params.craft;
        var username = req.params.user;
        
        db.User.findOne({where:{user_name: username}})
        .then(function(data) {
            var address = data.dataValues.address
            //use geocode function with callback to find city synchronously
            findCity(address, function() {
                db.Craft.findAll({
                where: [{ city: city },{craft:craft}],
                include: [db.User]
                }).then(function (dbCraft) {
                    console.log("==================data result==================")
                    console.log(dbCraft.dataValues)
                    var distanceArray = [];
                    var userAddress = {userHome: address}
                    distanceArray.push(userAddress)

                    var i = 0;
                    gatherDistData(i);
                    function completeMatch(array){
                        var userRating;
                        for(var i = 1; i < array.length; i++) {
                            if(array[i].username === username) {
                                userRating = array[i].rating;
                                break;
                            }
                        }
                        var filteredArr = array.filter(function(obj, index) {
                            if(index === 0){return true;}
                            if(obj.username === username || obj.rating !== userRating) {
                                return false;
                            } else {return true};
                        })
                        res.json(filteredArr)
                    }
                    function gatherDistData(index){
                        // console.log("startPoint: " + startPoint)
                        var destination = dbCraft[index].dataValues.User.address;
                        var username = dbCraft[index].dataValues.user_name;
                        var name = dbCraft[index].dataValues.User.first_name + " " + dbCraft[index].dataValues.User.last_name;
                        var rating = dbCraft[index].dataValues.experience_rating;
                        var origin = address;
                        var yearsExperience = dbCraft[index].dataValues.year_experience;
                        var userImgPath = dbCraft[index].dataValues.User.image;

                        var userDistanceData = {
                            username: username,
                            user: name,
                            years: yearsExperience, 
                            rating: rating,
                            userImg: userImgPath,
                        }
                        //------------google npm : gets distance between two locations------------
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
                      
                                    index++;
                                    if(index < dbCraft.length) {
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
