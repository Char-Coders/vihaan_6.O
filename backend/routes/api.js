var express = require('express');
var fs = require('fs')
const multer = require('multer');
const axios = require('axios');
const { JWTTokenVerify } = require('../middlewares');

const upload = multer();

var router = express.Router();

//router.use(JWTTokenVerify);

router.post('/video/capture', upload.single("data"), function(req, res, next) {
    console.log('hmm');
    let blob = req.file.buffer;
    // fs.createWriteStream('myvideo.webm', { flags: 'a' }).write(blob.buffer);

    let formData = new FormData();
    formData.append("data", Buffer.from(blob))
    axios.post('http://127.0.0.1:8081/video/capture', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
            }
    })
});

module.exports = router;
