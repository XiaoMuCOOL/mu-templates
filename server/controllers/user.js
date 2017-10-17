'use strict'
const UserModel = require('../models/user')
const Counter = require('./counter')
const Util = require('./util')

class User {
  constructor () {
    this.v = '0.01'
  }
  async save (user, ctx = {}) {
    try {
      user.userPwd = Util.MD5(user.userPwd)
      user.userId = await Counter.getSeqById()
      const saveUser = await UserModel.create(user)
      ctx.body = Util.getMsg(saveUser)
    } catch (err) {
      ctx.body = Util.getMsg(err.errmsg, err.code, '创建用户失败')
    }
    return ctx.body
  }
  async getByUserName (userName, ctx = {}) {
    try {
      const user = await UserModel.findOne({userName: userName})
      ctx.body = Util.getMsg(user)
    } catch (err) {
      ctx.body = Util.getMsg(err.errmsg, err.code, '获取信息出错')
    }
    return ctx.body
  }
  async updateByUserName (updateUser, ctx = {}) {
    try {
      if(updateUser.userPwd){
        updateUser.userPwd = Util.MD5(updateUser.userPwd)
      }
      const user = await UserModel.findOneAndUpdate({userName: updateUser.userName}, {$set: updateUser}, {new: true})
      ctx.body = Util.getMsg(user)
    } catch (err) {
      ctx.body = Util.getMsg(err.errmsg, err.code, '更新用户出错')
    }
    return ctx.body
  }
  async updateFriendsByUserId (updateUser, ctx = {}) {
    try {
      const user = await UserModel.findOneAndUpdate({userId: updateUser.userId}, {$push: {userFriends: updateUser.userFriends}}, {new: true})
      ctx.body = Util.getMsg(user)
    } catch (err) {
      ctx.body = Util.getMsg(err.errmsg, err.code, '更新用户好友出错')
    }
    return ctx.body
  }
  async login(ctx) {
    let {userName, userPwd} = ctx.body || ctx.query
    let user = await this.getByUserName(userName)
    if(user.body && Util.MD5(userPwd) === user.body.userPwd) {
      ctx.body = user
    }else {
      ctx.body = Util.getMsg({}, 100001, '用户名或密码错误')
    }
    return ctx.body
  }
  loginByGitHub() {

  }
}

module.exports = new User()
