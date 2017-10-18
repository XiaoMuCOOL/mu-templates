'use strict'
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  console.log(ctx.state.user)
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/login', async (ctx, next) => {
  await ctx.render('login', {
    title: '登录账户'
  })
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
