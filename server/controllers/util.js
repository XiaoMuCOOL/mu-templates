'use strict'
const colors = require('colors')
const CounterModel = require('../models/counter')
class Util {
  getMsg(body = {}, code = 200, msg = '成功' , ctx) {
    let result = {
      code : code,
      msg : msg,
      body : body
    }
    if(ctx) {
      ctx.body = result
    }
    this.info(result)
    return result
  }
  info(msg, space) {
    console.log()
    console.info('[Bingblue '+ space +']:'.yellow, msg.yellow)
    console.log()
  }
  success(msg) {
    console.log()
    console.info('[Bingblue]:'.green, msg.green)
    console.log()
  }
  error(msg) {
    console.log()
    console.info('[Bingblue]:'.red, msg.red)
    console.log()
  }
  tryAOP(cb) {
    try {
      return cb()
    } catch (err) {
      return this.getMsg(err.errmsg, err.code)
    }
  }
}

module.exports = new Util()
