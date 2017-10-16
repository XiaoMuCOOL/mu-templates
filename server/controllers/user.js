'use strict'
const crypto = require('crypto')
const UserModel = require('../models/user')
const Counter = require('./counter')
const Util = require('./util')

class User {
  constructor () {
    this.v = '0.01'
  }
  async save (user, ctx = {}) {
    try {
      user.userPwd = crypto.createHash('md5').update(user.userPwd + '').digest('hex')
      user.userId = await Counter.getSeqById()
      const saveUser = await UserModel.create(user)
      ctx.body = Util.getMsg(saveUser)
    } catch (err) {
      ctx.body = Util.getMsg(err.errmsg, err.code)
    }
    return ctx.body
  }
  async getByUserName (userName, ctx = {}) {
    try {
      const user = await UserModel.findOne({userName: userName})
      ctx.body = Util.getMsg(user)
    } catch (err) {
      ctx.body = Util.getMsg(err.errmsg, err.code)
    }
    return ctx.body
  }
  async updateByUserName (updateUser, ctx = {}) {
    try {
      if(updateUser.userPwd){
        updateUser.userPwd = crypto.createHash('md5').update(updateUser.userPwd + '').digest('hex')
      }
      const user = await UserModel.findOneAndUpdate({userName: updateUser.userName}, {$set: updateUser}, {new: true})
      ctx.body = Util.getMsg(user)
    } catch (err) {
      ctx.body = Util.getMsg(err.errmsg, err.code)
    }
    return ctx.body
  }
  async updateFriendsByUserId (updateUser, ctx = {}) {
    try {
      const user = await UserModel.findOneAndUpdate({userId: updateUser.userId}, {$push: {userFriends: updateUser.userFriends}}, {new: true})
      ctx.body = Util.getMsg(user)
    } catch (err) {
      ctx.body = Util.getMsg(err.errmsg, err.code)
    }
    return ctx.body
  }
}

module.exports = new User()
