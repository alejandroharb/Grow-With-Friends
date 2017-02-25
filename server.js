//import npm dependencies
var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var app = express();

//======database connection, models=========
var db = require('./models');

//=========Handlebars Setup============
var exphbr = require('express-handlebars');
app.engine("handlebars", exphbr({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//server port
var PORT = process.env.PORT || 3000;

// BodyParser makes it possible for our server to interpret data sent to it.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));

//==========importing routes=============
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);


db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("listening on Port: " + PORT);
    })
})