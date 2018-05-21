'use strict'
const Koa = require('koa')
const glob = require('glob')
const path = require('path')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const koaBody = require('koa-better-body')
const logger = require('koa-logger')
const koaStatic = require('koa-static')
const Router = require('koa-router')
// 跨域
const cors = require('koa2-cors')

const app = new Koa()
const router = new Router()

// error handler
onerror(app)

app.use(cors())
// middlewares
app.use(json())
app.use(koaBody({multipart: true}))
app.use(logger())
app.use(koaStatic(path.join(__dirname, '/public')))

app.use(views(path.join(__dirname, '/views'), {
  extension: 'pug'
}))

// session & 鉴权
app.keys = 'mockserver'
const passport = require('./controllers/auth')
app.use(passport.initialize())
app.use(passport.session())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 加载路由
glob.sync('routes/**/*.js', {cwd: __dirname}).sort((x, y) => {
  if (x.indexOf('index') > -1) return -1
  return 1
}).forEach(file => {
  const route = require('./' + file)
  let urlPath = file.replace(/\.[^.]*$/, '').replace('routes', '').replace('/index', '')
  router.use(urlPath, route.routes())
})
app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app