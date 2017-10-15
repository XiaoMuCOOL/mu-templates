'use strict'
require('colors')
class Util {
  getMsg (body = {}, code = 200, msg = 'success', ctx) {
    let result = {
      code: code,
      msg: msg,
      body: body
    }
    if (ctx) {
      ctx.body = result
    }
    return result
  }
  prefix (space, cb) {
    space = space ? ' ' + space : ''
    let prefix = '[Bingblue' + space + ']:'
    console.log()
    cb(prefix)
    console.log()
  }
  info (msg, space) {
    this.prefix(space, (prefix) => {
      console.info(prefix.yellow, msg)
    })
  }
  success (msg, space) {
    this.prefix(space, (prefix) => {
      console.info(prefix.green, msg)
    })
  }
  error (msg, space) {
    this.prefix(space, (prefix) => {
      console.info(prefix.red, msg)
    })
  }
}

module.exports = new Util()
