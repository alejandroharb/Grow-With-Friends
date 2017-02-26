var express = require('express');
var router = express.Router();
var multer = require('multer')
//file upload middleware
var uploading = multer({
  dest: __dirname + '../public/uploads/',
  limits: {fileSize: 1000000, files:1},
})

router.post('/upload', function(req, res) {
	var image = req.files;
	console.log(image)
});

module.exports = router;
