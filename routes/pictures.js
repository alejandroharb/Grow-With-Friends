var express = require('express');

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
        console.log(req.file);

        var newFile = path.join(__dirname, '/../public/uploads/images', req.file.originalname);
        mv(req.file.path, newFile, function (err) {
            if (err) {
                throw err;
            }
            console.log('Moved' + req.file.filename + ' to ' + newFile);
            res.send(true);//do something with front end here
        })
    });
};
