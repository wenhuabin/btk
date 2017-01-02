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

//api that return json data
router.get('/api/user/:uid', function (req, res, next) {
    console.log("get");
    console.log(req.params.uid);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        id: req.params.uid,
        name: '行旅书读',
        sex: 'male',
        age: '24',
        phone: '12244445555'
    }));
})
module.exports = router;

