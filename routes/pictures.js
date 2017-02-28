var express = require('express');
var db = require('../models')
var multer = require('multer')
var mv = require('mv');
var path = require('path');
var tmp = require('tmp');

var tempDir = tmp.dirSync();//Create a new temp directory
var upload = multer({
    dest: tempDir.name,
    limits: {
        fileSize: 10 * 1024 * 104
    },
});

module.exports = function (app) {
    app.post('/image-upload', upload.single('image'), function (req, res) {
        var username = req.body.username;
        var extension = path.parse(req.file.originalname).ext;
        var newFile = path.join(__dirname, '/../public/uploads/images', username + extension);
        mv(req.file.path, newFile, function (err) {
            if (err) {
                throw err;
            }
            db.User.update({image: username + extension},{
                where: { user_name: username }
            })
                .then(function (response) {
                    console.log("updated image for user " + username + "image name: " + username + extension)
                    res.redirect('/api/home/'+username);
                })
            console.log('Moved' + req.file.filename + ' to ' + username+extension);
            
        })
    });
};
