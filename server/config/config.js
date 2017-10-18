'use strict'
const config = {
  mongodb: {
    cookieSecret: 'mygroup',
    db: 'group',
    host: '127.0.0.1',
    port: 27017,
    url: 'mongodb://127.0.0.1:27017/test'
  },
  sqe: [], // {_id: 'userId'}, {_id: 'groupId'}
  jwt: {
    secret: 'me' // 默认
  },
  mongodbSecret: { // mongodb用户和密码
    user: '',
    pass: ''
  },
  github: {
    clientID: 'ef17fd53612fb8bea361',
    clientSecret: '5dc4ee2d35feac53a4e0d03e04179b24db1704ec',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  }
}

module.exports = config
