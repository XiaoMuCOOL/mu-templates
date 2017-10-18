'use strict'
const mongoose = require('../config/db')

const userSchema = new mongoose.Schema({
  userId: {// 用户ID 类似QQ号
    type: Number,
    unique: true
  },
  // 必填字段
  userName: {// 用户名
    type: 'String',
    required: '用户名不能为空!', // 是否必填项
    unique: true,
    match: [/(?!^\d+$)^[0-9a-zA-Z]{6,15}$/, '用户名只能输入数字、字符a-z,且不能全为数字,6~15个字符!']
  },
  userPwd: {// 密码
    type: 'String',
    required: '密码不能为空!'
  },
  nickName: {// 昵称
    type: 'String',
    default: '萌新',
    match: [/^[0-9a-zA-Z\u4e00-\u9fa5.]{1,20}$/, '昵称只能输入数字、字符a-z、中文,最长20个字符!']
  },
  userPhone: {
    type: 'String'
    // required: '手机号不能为空!'
  },
  userSex: {
    type: 'String',
    default: '人妖',
    enum: ['男', '女', '人妖']
  },
  userEmail: {
    type: 'String',
    match: [/[_a-zA-Z\d\-./]+@[_a-zA-Z\d-]+(\.[_a-zA-Z\d-]+)+/, '邮箱格式不正确']
  },

  // 选填
  userBio: {// 简介
    type: 'String',
    default: '这个人很懒,什么都没填'
  },
  userAvatar: {
    type: 'String',
    default: '/upload/default_avatar.png'
  },
  invitationCode: {
    type: 'String'
  },
  userFriends: {
    type: [Number]
  },
  systemMsg: {
    type: []
  },

  // 系统生成字段
  invitationCodeNum: {// 邀请码使用次数
    type: Number,
    default: 10
  },
  githubId: {
    type: 'String',
    default: ''
  },
  userStatus: {// 用户状态 1.正常 2.在线、3离线、0封禁
    type: Number,
    default: 1
  },
  userLvl: {// 用户等级
    type: Number,
    default: 1
  },
  userVip: {// VIP等级
    type: Number,
    default: 0
  },
  regDate: {// 注册时间
    type: Date,
    default: Date.now
  }
}, {
  collection: 'users'
})

module.exports = mongoose.model('Users', userSchema)
