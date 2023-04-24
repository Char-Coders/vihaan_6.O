var express = require('express');
var fs = require('fs')
const multer = require('multer');
const { JWTTokenVerify } = require('../middlewares');
const upload = multer();

var router = express.Router();

//router.use(JWTTokenVerify);

router.post('/video/capture', upload.single("data"), function(req, res, next) {
    console.log('hmm');
    let blob = req.file;
    console.log(JSON.stringify(blob.mimeType));
    //const dataBuffer = new Buffer.from(blob);
    fs.createWriteStream('myvideo.webm', { flags: 'a' }).write(blob.buffer);
    //console.log("file size: " + String(blob));
    res.sendStatus(200);
});

module.exports = router;
