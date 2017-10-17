'use strict'
require('colors')
const crypto = require('crypto')

class Util {
  getMsg (body = {}, code = 200, msg = 'success') {
    let result = {
      code: code,
      msg: msg,
      body: body
    }
    return result
  }
  MD5 (text) {
    return crypto.createHash('md5').update(text + '').digest('hex')
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
