'use strict'

var config = require('./config');
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function (req, res, next) {
    if(req.headers['user-agent'].match(/(iPhone|iPod|Android)/i)){
        console.log("mobile");
        res.sendFile(path.join(__dirname, '../../bin/mindex.html'));
    }else{
        console.log("pc");
        res.sendFile(path.join(__dirname, '../../bin/index.html'));
    }
})

router.get('/:page', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../../bin/404.html'));
})

router.get('/images/:name', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../../src/images/'+req.params.name));
})

router.get('/bin/css/:name', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../../bin/css/'+req.params.name));
})

router.get('/bin/js/:name', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../../bin/js/'+req.params.name));
})

module.exports = router;

