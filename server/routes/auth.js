'use strict'
const router = require('koa-router')()
const passport = require('koa-passport')

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))

router.get('/logout', function (ctx) {
  ctx.logout()
  ctx.redirect('/')
})

router.get('/github', passport.authenticate('github'))
router.get('/github/callback', passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/login'
}))

module.exports = router
