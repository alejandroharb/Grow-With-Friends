var db = require('../models');

module.exports = function(app) {
    //==========creating new user account==========
    app.post("/sign-up", function(req, res) {
        var data = req.body;
        //might want to try findOrCreate({})
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
    //=================Unique User HOME PAGE================
    app.get('/api/home/:key', function(req, res) {
        var key = req.params.key
        //----query data for this specific profile-----
        //----display data via handlebars----
        db.User.findOne({where: {user_name: key}})
            .then(function(response) {
                console.log(response.dataValues)
                res.render('user-home', {info: response.dataValues})
            })
    });
    //================User Selects SKILLS====================
    app.get('/api/create-profile/:key', function(req, res) {
        //key variable stores username of user
        var key = req.params.key;
        //========RAUL WORK HERE==========
        //---create sequelize function that sends data into mysql database into ****CORRECT TABLE****-----

    });
}