'use strict'
const CounterModel = require('../models/counter')
const Config = require('../config/config')
const Util = require('./util')
class Counter {
  constructor () {
    if (Config.sqe.length > 0) {
      this.init()
    }
  }
  async init () {
    try {
      await CounterModel.create(Config.sqe)
      Util.success('创建Counter表成功')
    } catch (err) {
      Util.error('创建Counter表失败: ' + err.errmsg)
    }
  }
  async getSeqById (id = 'userId') {
    try {
      const result = await CounterModel.findOneAndUpdate({_id: id}, { $inc: { seq: 1 } }, {'new': true, 'upsert': true})
      return result.seq
    } catch (err) {
      return Util.getMsg(err.errmsg, err.code)
    }
  }
}

module.exports = new Counter()
