'use strict'
const webpackMerge = require('webpack-merge')
const base = require('./base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
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
        use: ExtractTextPlugin.extract({
          publicPath: '../',
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: loader => [cssnext()]
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096, // 4k
              name: 'img/[name]-[hash:5].[ext]' // 图片编译后放置在文件夹img下 [name]图片原名 [hase:5]5位的hash值 [ext]图片原类型
            }
          },
          {
            loader: 'image-webpack-loader', // 压缩图片
            options: {
              optipng: {
                optimizationLevel: 7
              },
              mozjpeg: {
                quality: 65
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        query: {
          interpolate: 'require'
          // minimize:true
        }
      }
    ]
  }
})
