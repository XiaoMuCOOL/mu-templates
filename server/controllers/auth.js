'use strict'
const passport = require('koa-passport')
const UserModel = require('../models/user')
const Config = require('../config/config')
const User = require('./user')
const Util = require('./util')


passport.serializeUser(function(user, done) {
  done(null, user._id)
})

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.getById(id)
    done(null, user)
  } catch(err) {
    done(err)
  }
})

// 普通登录
const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(function(userName, userPwd, done) {
  User.getByUserName(userName)
  .then(user => {
    if(user.body && Util.MD5(userPwd) === user.body.userPwd) {
      done(null, user.body)
    }else {
      done(null, false)
    }
  })
  .catch(err => done(err))
}))

// github登录
const GitHubStrategy = require('passport-github2').Strategy
passport.use(new GitHubStrategy({
    clientID: Config.github.clientID,
    clientSecret: Config.github.clientSecret,
    callbackURL: Config.github.callbackURL
  },async function(accessToken, refreshToken, profile, done) {
    let user = {
      userName: profile.username,
      userPwd: 'default',
      nickName: profile.displayName,
      userSex: '男',
      userEmail: profile._json.email,
      userBio: profile._json.bio,
      userAvatar: profile._json.avatar_url,
      githubId: profile.id
    }
    const result = await User.findOrCreate(user, 'github')
    return done(null, result)
  }
))
