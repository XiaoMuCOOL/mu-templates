'use strict'
const config = {
  keys: ['mu-koa2'],
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
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    ttl: 3600
  }
}

module.exports = config
