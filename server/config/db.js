'use strict'
const config = require('./config')
let mongoose = require('mongoose')
mongoose.connect(config.mongodb.url, { useMongoClient: true })
mongoose.Promise = global.Promise
mongoose.connection.on('error', console.error)
mongoose.connection.once('connected', () => {
  console.log('connected mongoodb!')
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected')
})

module.exports = mongoose
