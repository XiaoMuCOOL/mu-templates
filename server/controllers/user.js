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
  async getById (id, ctx = {}) {
    try {
      const user = await UserModel.findById({_id: id})
      ctx.body = Util.getMsg(user)
    } catch (err) {
      ctx.body = Util.getMsg(err.errmsg, err.code, '获取信息出错')
    }
    return ctx.body
  }
  async updateByUserName (updateUser, ctx = {}) {
    try {
      if (updateUser.userPwd) {
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
  async findOrCreate (user, type = 'userName') {
    let query = {}
    let result = {}
    switch (type) {
      case 'github':
        query = { githubId: user.githubId }
        break
      case 'qq':
        query = { qqId: user.qqId }
        break
      case 'wechat':
        query = { wechatId: user.wechatId }
        break
      default:
        query = { userName: user.userName }
        break
    }
    try {
      result = await UserModel.findOne(query)
      if (!result) {
        result = await this.save(user).body
      }
      Util.getMsg(result)
    } catch (err) {
      result = Util.getMsg(err.errmsg, err.code, '创建' + type + '账户失败')
    }
    return result
  }
}

module.exports = new User()
