'use strict'
const Config = {
  // dev环境
  dev: {
    api: {
      user: 'dev/user/login'
    },
    other: {
      name: 'dev'
    }
  },
  // 线上环境
  prod: {
    api: {
      user: 'prod/user/login'
    },
    other: {
      name: 'dev'
    }
  }
}
module.exports = Config
