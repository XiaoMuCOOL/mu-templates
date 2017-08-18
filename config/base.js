'use strict'
const path = require('path')
const uitls = require('./uitls')
let minStr = process.env.NODE_ENV === 'dev' ? '' : 'min.'
module.exports = {
  entry: uitls.entry,
  plugins: uitls.plugins,
  output: {
    filename: 'js/[name].' + minStr + 'js',
    publicPath: './',
    path: path.resolve(__dirname, '../dist')
  }
}
