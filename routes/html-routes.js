var db = require('../models');
var path = require('path')

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render("index",{title:"front page", layout:"front-page"});
    })
    app.get('/create-user', function(req, res) {
        res.render("sign-up", {title:"sign up page", layout: "front-page"});
    })
    app.get('/home-redirect', function(req, res) {
        res.render('user-home')
    });
    app.get('/test',function(req, res) {
        res.render('test');
    })
}