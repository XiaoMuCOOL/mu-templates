'use strict'
import test from 'ava'
import User from '../server/controllers/user'

let user = {
  userName: 'xiaomu',
  userPwd: 'a123456',
  userPhone: '15000785080'
}

// test.serial('user.save', async t => {
//   t.log('测试用户保存')
//   let result =await User.save(user)
//   t.is(result.body.userName, user.userName, '测试返回用户名是否正确')
// })

test.serial('user.getByUserName', async t => {
  t.log('测试获取用户信息')
  let result =await User.getByUserName(user.userName)
  t.is(result.body.userPhone, user.userPhone, '测试返回手机号是否正确')
})

test.serial('user.updateByUserName', async t => {
  t.log('测试用户更新')
  let newUser = {
    userName:'xiaomu',
    userPwd: 'a1234567',
    nickName:'小牧COOL'
  }
  let result =await User.updateByUserName(newUser)
  t.is(result.body.nickName, newUser.nickName, '测试返回昵称是否正确')
})

test.serial('user.updateFriendsByUserId', async t => {
  t.log('测试用户好友更新')
  let newUser = {
    userId: 100013,
    userFriends: 100002
  }
  let result =await User.updateFriendsByUserId(newUser)
  t.is(result.body.userId, newUser.userId, '测试返回ID是否正确')
})

test.serial('user.login', async t => {
  t.log('测试用户登陆')
  let ctx = {
    body: {
      userName: 'xiaomu',
      userPwd: 'a1234567'
    }
  }
  let result = await User.login(ctx)
  t.is(result.body.userName, user.userName, '测试返回用户名是否正确')
})
