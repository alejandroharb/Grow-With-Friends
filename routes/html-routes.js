var db = require('../models');
var path = require('path')

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render("testindex");
    })
}