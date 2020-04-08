require('dotenv').config()
require('./db')
var express = require('express')
var server = express()

var bodyParser = require('body-parser')

server.use(bodyParser.json())

var router = require('./config/routes')
server.use(router)

server.listen(process.env.SERVER_PORT || 4000, () => {
  console.log('server started')
})

module.exports = server
