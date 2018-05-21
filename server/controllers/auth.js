'use strict'
const passport = require('koa-passport')
const User = require('./user')
const Util = require('./util')
const JWT = require('jsonwebtoken')

function createToken(id) {
  const token = JWT.sign({ id }, 'mockserver', {
    expiresIn: '2h',
    issuer: 'www.xx.com', // 签发者
    audience: 'www.xx.com' // 接收方
  })
  return token
}

// 序列化ctx.login()触发
passport.serializeUser(function (user, done) {
  done(null, user._id)
})

// 反序列化
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.getById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})
// 普通登录
const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy({
  usernameField: 'userName',
  passwordField: 'userPwd'
}, function (userName, userPwd, done) {
  User.getByUserName(userName)
  .then(user => {
    if (user.body && userPwd === user.body.userPwd) {
      user.body.token = createToken(user.body.id)
      done(null, user.body)
    } else {
      done(null, false)
    }
  })
  .catch(err => done(err))
}))

// JWT登录
// const { JwtStrategy,ExtractJwt } = require('passport-jwt')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
let jwtOpt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: 'mockserver',
  issuer: 'www.xx.com',
  audience: 'www.xx.com'
}
passport.use(new JwtStrategy(jwtOpt, function (jwt_payload, done) {
  User.getById(jwt_payload.id)
  .then(user => {
    if(user) return done(null, user)
  })
  .catch(err => done(err))
}))

module.exports = passport
