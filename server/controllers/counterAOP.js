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
    const result = await Util.tryAOP(async ()=> {
      const seq = await CounterModel.create(config.sqe)
      return Util.getMsg("创建Counter表成功")
    })
    console.info('bingblue: ', result.body)
  }
  async getSeqById(id='userId') {
    const result = await Util.tryAOP(async ()=> {
      const seq = await CounterModel.findOneAndUpdate({_id:id},{ $inc: { seq: 1 } }, {'new': true, 'upsert': true})
      return Util.getMsg(seq.seq)
    })
    return result
  }
}

module.exports = new Counter()
