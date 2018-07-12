'use strict'
const gulp = require('gulp')
const fs = require('fs')
const del = require('del')
const path = require('path')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const stylelint = require('gulp-stylelint')
const standard = require('gulp-standard')
const cssnext = require('postcss-cssnext')
const precss = require('precss')
const sequence = require('gulp-sequence')
const htmlReplace = require('gulp-html-replace')
const bs = require('browser-sync').create()
const config = require('./config')

/*
 * 使用postcss编译css
 */
gulp.task('postcss', () => {
  return gulp.src(config.css.src)
    .pipe(postcss([
      precss(),
      cssnext({
        warnForDuplicates: false
      })
    ]))
    .pipe(rename({extname: '.css'}))
    .pipe(gulp.dest(config.css.dest))
})
/**
 * 检测js语法
 */
gulp.task('standard', () => {
  return gulp.src(config.js.src)
    .pipe(standard({
      fix: true
    }))
    .pipe(standard.reporter('default', {
      breakOnError: false,
      quiet: false
    }))
    .pipe(gulp.dest(config.js.dest))
})

/**
 * 检测css语法
 */
gulp.task('stylelint', ()=> {
  return gulp.src(config.css.src)
    .pipe(stylelint({
      fix: true,
      failAfterError: false,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
    .pipe(gulp.dest('../src/less'))
})
/*
 * 生成HTML
 */
gulp.task('html', () => {
  let htmlReplaceTask = {}
  fs.readdirSync('../src/html/part').forEach(file => {
    let attr = path.parse(file).name
    htmlReplaceTask[attr] = {
      src: fs.readFileSync('../src/html/part/' + file),
      tpl: '%s'
    }
  })
  return gulp.src(config.html.src)
    .pipe(htmlReplace(htmlReplaceTask, {
      keepUnassigned: true,
      keepBlockTags: true
    }))
    .pipe(gulp.dest(config.html.dest))
})

/*
 * 删除HTML生成内容
 */
gulp.task('delHtml', () => {
  let htmlReplaceTask = {}
  fs.readdirSync('../src/html/part').forEach(file => {
    let attr = path.parse(file).name
    htmlReplaceTask[attr] = {
      src: '',
      tpl: '%s'
    }
  })
  return gulp.src(config.html.src)
    .pipe(htmlReplace(htmlReplaceTask, {
      keepUnassigned: true,
      keepBlockTags: true
    }))
    .pipe(gulp.dest(config.html.dest))
})

/*
 * 删除生成的文件
 */
gulp.task('delFile', () =>
  del(config.clean.src, {
    force: true
  })
)

/* 组合任务 */
gulp.task('dev', () => {
  return sequence(['standard', 'stylelint'], ['postcss'])((err) => {
    if (err) console.log(err)
  })
})

gulp.task('css', () => {
  return sequence(['stylelint'], ['postcss'])((err) => {
    if (err) console.log(err)
  })
})

gulp.task('build', ['dev', 'html'])

gulp.task('del', ['delHtml', 'delFile'])
/*
 * 默认执行
 */
gulp.task('default', ['dev'])

/*
 * 启动服务器
 */
gulp.task('server', ['dev'], () => {
  bs.init({
    server: {
      baseDir: ['../src/'],
      directory: true,
      index: 'index.html'
    },
    logPrefix: 'Browser Sync'
  })
  gulp.watch(config.css.src, (event)=> {
    console.log('[项目信息] 文件 [' + event.path + '] 有变动,状态为:' + event.type)
    sequence(['stylelint'])(() => {
      setTimeout(function(){
        sequence(['postcss'])()
      }, 500)
    })
  })
  gulp.watch(config.js.src, ['standard'])
  gulp.watch(config.html.watch, ['html'])
  bs.watch(config.server.src, () => bs.reload())
})
