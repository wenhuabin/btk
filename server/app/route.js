'use strict'

var config = require('./config');
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../../bin/index.html'));
})

router.get('/:page', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../../bin/404.html'));
})

router.get('/images/:img', function (req, res, next) {
    console.log("get image");
    res.sendFile(path.join(__dirname, '../../src/images/img'));
})

module.exports = router;

