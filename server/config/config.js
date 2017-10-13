'use strict'
const config = {
  mongodb: {
    cookieSecret: 'mygroup',
    db: 'group',
    host: '127.0.0.1',
    port: 27038,
    url: 'mongodb://127.0.0.1:27038/group'
  },
  sqe: [{_id: 'userId'}, {_id: 'groupId'}], //{_id: 'userId'}, {_id: 'groupId'}
  jwt: {
    secret: 'me' // 默认
  },
  mongodbSecret: { // mongodb用户和密码
    user: '',
    pass: ''
  }
}

module.exports = config
