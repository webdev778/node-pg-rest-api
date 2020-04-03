var express = require('express');
var server = express();
var db = require('./db');
var bodyParser = require('body-parser');

server.use(bodyParser.json());

var router = require('./config/routes');
server.use(router);

server.listen(80, ()=>{
    console.log('server started');
})

module.exports = server;