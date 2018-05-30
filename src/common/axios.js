'use strict'
import Axios from 'axios'
import router from '../router'

import Vue from 'vue'
import Vuex from 'vuex'
import store from '../store'
Vue.use(Vuex)

// 收到response 拦截器
Axios.interceptors.response.use(response => {
  const data = response.data
  if(data.code === 200) return data.body
  console.log('服务器=>', response)
  Vue.$message({
    message: data.msg,
    type: 'error'
  })
  return new Promise(() => {})
}, err => {
  if (err.response) {
    console.info('axios=>', err)
    switch (err.response.status) {
      case 401:
        // 身份认证失败，清除token并返回登陆页
        store.commit('LOGOUT')
        router.replace({
          path: 'login',
          query: { redirect: router.currentRoute.fullPath }
        })
        break
      default:
        Vue.$message({
          type: 'error',
          message: '抱歉，网络或服务器不稳定，请重试'
        })
        break
    }
  }
  return new Promise(() => {})
})

export default Axios
