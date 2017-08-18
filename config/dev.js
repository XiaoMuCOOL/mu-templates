'use strict'
const webpackMerge = require('webpack-merge')
const base = require('./base')
const path = require('path')
const cssnext = require('postcss-cssnext')

module.exports = webpackMerge(base, {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                cssnext()
              ]
            }
          }
        ]
      }, {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 4096, // 4k
          name: 'img/[name]-[hash:5].[ext]' // 图片编译后放置在文件夹img下 [name]图片原名 [hase:5]5位的hash值 [ext]图片原类型
        }
      }, {
        test: /\.html$/,
        loader: 'html-loader',
        query: {
          interpolate: 'require'
          // minimize:true
        }
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true, // 启用 HMR
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
})
