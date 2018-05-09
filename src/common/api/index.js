'use strict'
let hostname = window.location.hostname
//默认本地环境
// let baseUrl = 'http://localhost:8080/api/'
let baseUrl = 'http://106.14.2.143:18090/e3-webapp/'
if(hostname === '106.14.2.143') {  // 开发环境
  baseUrl = 'http://106.14.2.143:18090/e3-webapp/'
}else if(hostname === 'test.e3-expo.com') {  // 测试环境
  baseUrl = 'http://test.e3-expo.com/api/'
} else if(hostname === 'e3-expo.com') { // 正式环境
  baseUrl = 'http://e3-expo.com/api/'
}

export default {
  // 获取短信验证码
  // sendMsgCode: baseUrl + 'sendMsgCode',
  sendMsgCode: baseUrl + 'veriCode',
  checkMsgCode: baseUrl + 'checkVeriCode'
}