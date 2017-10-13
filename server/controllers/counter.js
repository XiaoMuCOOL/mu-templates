'use strict'
const CounterModel = require('../models/counter')
const config = require('../config/config')
const Util = require('./util')
class Counter {
  constructor() {
    if(config.sqe.length > 0) {
      this.init()
    }
  }
  async init(){
    try {
      const seq = await CounterModel.create(config.sqe)
      console.log('创建Counter表成功')
    } catch (err) {
      console.log('创建Counter表失败: ' + err)
    }
  }
  async getSeqById(id='userId') {
    try {
      const seq = await CounterModel.findOneAndUpdate({_id:id},{ $inc: { seq: 1 } }, {'new': true, 'upsert': true})
      return Util.getMsg(seq.seq)
    } catch (err) {
      return Util.getMsg(err.errmsg, err.code)
    }
  }
}

module.exports = new Counter()
