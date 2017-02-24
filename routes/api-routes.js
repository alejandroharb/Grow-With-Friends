var db = require('../models');

module.exports = function(app) {
    //creating new user account
    app.post("/sign-up", function(req, res) {
        var data = req.body;
        //might want to try findOrCreate({})
        db.User.create({
            first_name: data.first,
            last_name: data.last,
            user_name: data.username,
            password: data.password,
            email: data.email,
            address: data.address
        }).then(function(dbUser) {
            //check to see if it exists already
            res.render("user-home", {});
        })
    })
}