var db = require('../models');
var path = require('path')

module.exports = function(app) {
    app.get('/', (req, res) => {
        res.render("index",{title:"front page", layout:"front-page"});
    })
    app.get('/create-user', (req, res) => {
        res.render("sign-up", {title:"sign up page", layout: "front-page"});
    })
    app.get('/home-redirect', (req, res) => {
        res.render('user-home')
    });
    app.get('/test', (req, res) => {
        res.render('test');
    });
    app.get('/create-profile', (req, res) => {
        res.render('create-profile');
    });
}