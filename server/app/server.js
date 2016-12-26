'use strict'

var express = require('express');
var route = require('./route');
var cookieParser = require('cookie-parser');
var config = require('./config');

var app = express();

app.use(cookieParser());

app.use('/', route);

var env = process.env.NODE_ENV || 'development';

if(env !== 'development') {
    config.port = 2222;
}

app.listen(config.port, function () {
    console.log(`Listening at localhost:${config.port}`);
})

