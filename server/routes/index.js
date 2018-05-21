'use strict'
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = 'hello world'
})

module.exports = router
