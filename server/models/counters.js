'use strict'
const mongoose = require('../config/db')

var countersSchema = new mongoose.Schema({
  _id: String,
  seq: Number
}, {
  collection: 'counters'
})
countersSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback)
}
var CountersModel = mongoose.model('counters', countersSchema)

function Counters (counters) {
  this._id = counters._id
  this.seq = counters.seq
}

Counters.prototype.save = function (callback) {
  var counters = {
    _id: 'userid',
    seq: 100000
  }

  var countersEntity = new CountersModel(counters)

  countersEntity.save(function (err, counters) {
    if (err) {
      return callback(err)
    }
    callback(null, counters)
  })
}
Counters.getNextSequence = function (name, callback) {
  CountersModel.findAndModify({}, [], { $inc: { seq: 1 } }, {'new': true, 'upsert': true}, function (err, ret) {
    if (err) {
      callback(err)
    } else {
      callback(null, ret.value.seq)
    }
  })
}

module.exports = Counters
