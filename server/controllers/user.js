'use strict'
const Util = require('./util')
const UserModel = require('../data/user_data')

class User {
  constructor () {
    this.v = '0.01'
  }
  async getByUserName (userName, ctx = {}) {
    try {
      let result
      UserModel.map((user)=>{
        if(user.userName === userName) {
          result = user
        }
      })
      ctx.body = Util.getMsg(result)
    } catch (err) {
      ctx.body = Util.getMsg(err.errmsg, err.code, '获取信息出错')
    }
    return ctx.body
  }
  async getById (id, ctx = {}) {
    try {
      let result
      UserModel.map((user)=>{
        if(user.id === id) {
          result = user
        }
      })
      ctx.body = Util.getMsg(result)
    } catch (err) {
      ctx.body = Util.getMsg(err.errmsg, err.code, '获取信息出错')
    }
    return ctx.body
  }
}

module.exports = new User()
