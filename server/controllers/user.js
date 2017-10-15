'use strict'
const crypto = require('crypto')
const Counter = require('./counter')
const UserModel = require('./schema/user')
const Util = require('./util')

class User {
  constructor () {
    this.v = '0.01'
  }
  async save (user, ctx) {
    try {
      let passwordMD5 = crypto.createHash('md5').update(this.user.userPwd + '').digest('hex')
      this.user.userPwd = passwordMD5
      this.user.userId = await Counter.getSeqById()
      const user = UserModel.create(this.user)
      return Util.getMsg(user)
    } catch (err) {
      return Util.getMsg(err.errmsg, err.code)
    }
  }
  async getByUserName (userName, ctx) {
    try {
      const user = await UserModel.findOne({userName: userName})
      return Util.getMsg(user)
    } catch (err) {
      return Util.getMsg(err.errmsg, err.code)
    }
  }
  async updateByUserName (updateUser, ctx) {
    try {
      const user = await UserModel.findOneAndUpdate({userName: updateUser.userName}, {$set: updateUser}, {new: true})
      return Util.getMsg(user)
    } catch (err) {
      return Util.getMsg(err.errmsg, err.code)
    }
  }
  async updateFriendsByUserId (updateUser, ctx) {
    try {
      const user = await UserModel.findOneAndUpdate({userId: updateUser.userId}, {$push: {userFriends: updateUser.userFriends}}, {new: true})
      return Util.getMsg(user)
    } catch (err) {
      return Util.getMsg(err.errmsg, err.code)
    }
  }
}

// User.createInvitationCodeByUserId = function (updateUser, callback) {
//   UserModel.findOneAndUpdate({userId: updateUser.userId}, {$set: updateUser}, {new: true}, function (err, user) {
//     callback(err, user)
//   })
// }
// User.getByInvitationCode = function (invitationCode, callback) {
//   UserModel.findOne({invitationCode: invitationCode}, function (err, user) {
//     callback(err, user)
//   })
// }

// User.getUserList = function (callback) {
//   UserModel.find(function (err, userList) {
//     callback(err, userList)
//   })
// }

// User.getUserListByUserId = function (userIdList, callback) {
//   UserModel.find({userId: {$in: userIdList}}, function (err, userList) {
//     callback(err, userList)
//   })
// }

// User.getLikeNickName = function (nickName, callback) {
//   let reg = new RegExp(nickName + '.*', 'i')
//   UserModel.find({nickName: {$regex: reg}}, function (err, user) {
//     callback(err, user)
//   })
// }
module.exports = new User()
