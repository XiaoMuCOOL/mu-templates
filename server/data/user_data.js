'use strict'
let users = []
let user1 = {
  id: 0,
  userName: 'xiaoming',
  userPwd: '123456',
  age: 15,
  nickName: '小明',
  vip: 2
}
users.push(user1)
for (let i = 0; i < 10; i++) {
  let num = i + 1
  users.push({
    id: num,
    userName: 'xiaoming' + num,
    userPwd: '123456',
    age: 15 + num,
    nickName: '小明' + num,
    vip: 2 + Math.floor(Math.random(0, 10))
  })
}

module.exports = users
