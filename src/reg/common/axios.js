'use strict'
import Axios from 'axios'
import router from '../router'
import { AlertModule } from 'vux'

import Vue from 'vue'
import Vuex from 'vuex'
import store from '../store'
Vue.use(Vuex)

// 发起request 拦截器
Axios.interceptors.request.use(config => {
  // 为每个http header都加上token
  if (localStorage.token) {
    config.headers.Authorization = `JWT ${ localStorage.token }`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 收到response 拦截器
Axios.interceptors.response.use(response => {
  const data = response.data
  if(data.code === 200) return data.body
  console.log('服务器=>', response)
  AlertModule.show({
    title: '抱歉',
    content: data.msg
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
        AlertModule.show({
          title: '抱歉',
          content: '网络或服务器不稳定，请重试'
        })
        break
    }
  }
  return new Promise(() => {})
})

export default Axios
