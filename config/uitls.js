'use strict'
const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 复制html
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 把css单独成一个文件
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清理插件
// const CopyWebpackPlugin = require("copy-webpack-plugin"); //复制
const config = require('../src/js/config.js')
let isDev = process.env.NODE_ENV === 'dev'
let minStr = isDev ? '' : 'min.'
/* 一些webpack基础配置 */
let webpackConfig = {
  entry: {
    vendor: ['jquery', './src/js/tools.js', './src/js/config.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
      Config: JSON.stringify(config[process.env.NODE_ENV])
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor.' + minStr + 'js'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
      Tools: './tools'
    }),

    new CleanWebpackPlugin([path.resolve(__dirname, '../dist')], {
      root: path.resolve(__dirname, '../')
    })
  ]
}
if (isDev) {
  // 热加载
  let HMR = new webpack.HotModuleReplacementPlugin()
  webpackConfig.plugins.push(HMR)
} else {
  // 压缩js
  let uglifyJs = new webpack.optimize.UglifyJsPlugin({
    sourceMap: true
  })
  // 提取css用link引入
  let ET = new ExtractTextPlugin('css/style.min.css')

  webpackConfig.plugins.push(uglifyJs)
  webpackConfig.plugins.push(ET)
}
// 获取指定路径下的入口文件
function getEntry (globPath, pathDir) {
  let files = glob.sync(globPath)
  let entries = {}
  let entry
  let dirname
  let basename
  let pathname
  let extname
  for (let i = 0; i < files.length; i++) {
    entry = files[i]
    dirname = path.dirname(entry)
    extname = path.extname(entry)
    basename = path.basename(entry, extname)
    pathname = path.join(dirname, basename)
    pathname = pathDir
      ? pathname.replace(new RegExp('^' + pathDir), '')
      : pathname
    // entries[pathname] = ['./' + entry];
    entries[basename] = [basename]
  }
  return entries
}

let entries = getEntry(path.resolve(__dirname, '../src/**.html'))
Object.keys(entries).forEach(function (name) {
  // 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry
  webpackConfig.entry[name] = './src/js/' + entries[name] + '.js'

  // 每个页面生成一个html
  let plugin = new HtmlWebpackPlugin({
    // 生成出来的html文件名
    filename: name + '.html',
    // 每个html的模版，这里多个页面使用同一个模版
    template: './src/' + name + '.html',
    // 自动将引用插入html
    inject: true,
    // 每个html引用的js模块，也可以在这里加上vendor等公用模块
    chunks: ['vendor', name],
    hash: true,
    minify: {
      // removeAttributeQuotes: true, // 移除属性的引号
      removeComments: true, // 移除HTML中的注释
      collapseWhitespace: true, // 删除空白符与换行符
      preserveLineBreaks: true, // 始终会折叠为1个换行符
      removeRedundantAttributes: true, // 当值与默认值匹配时删除属性。
      removeScriptTypeAttributes: true, // 删除type='text/javascript'
      removeStyleLinkTypeAttributes: true // 删除type='text/css'
    }
  })
  webpackConfig.plugins.push(plugin)
})
module.exports = webpackConfig
