'use strict'
let mongoose = require('mongoose')
const Config = require('./config')
const Util = require('../controllers/util')
mongoose.connect(Config.mongodb.url, { useMongoClient: true })
mongoose.Promise = global.Promise
mongoose.connection.on('error', console.error)
mongoose.connection.once('connected', () => {
  Util.success('connected mongoodb!')
})
mongoose.connection.on('disconnected', () => {
  Util.error('Mongoose connection disconnected!')
})

module.exports = mongoose
