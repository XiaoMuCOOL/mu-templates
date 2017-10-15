'use strict'
const mongoose = require('../config/db')

var countersSchema = new mongoose.Schema({
  _id: String,
  seq: { // 从100000增长
    type: Number,
    default: 100000
  }
}, {
  collection: 'counters'
})

module.exports = mongoose.model('counters', countersSchema)
