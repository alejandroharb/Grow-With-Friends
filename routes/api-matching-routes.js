var db = require('../models');

module.exports = function (app) {
    //==========USER MATCHING==========
    app.get('/match/:skill/:user', function (req, res) {
        var skill = req.params.skill;
        var username = req.params.user;
        console.log("made it into route")
        db.Golf.findAll({
            where: { city: "Humble" },
            include: [db.User]
        }).then(function (data) {
            ////do matching work here!!!!
            res.json(data);
        })
    })
}