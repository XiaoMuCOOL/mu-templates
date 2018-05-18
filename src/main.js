'use strict'
import Vue from 'vue'
import App from './App'
import router from './router'

/**
 * 引入vuex
 */
import store from './store'

/**
 * Vux 不支持全部导入
 */
// import Vux from 'vux'
// Vue.use(Vux)
//按需引入
import { Group } from 'vux'
Vue.component('Group', Group)

/**
 * axios
 */
// import Axios from 'axios'
// Vue.prototype.axios = Axios
import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

/**
 * 路由发生变化修改页面title
 */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // meta为false或者为空 并且 没有token 的返回登陆页
  if(!to.meta.auth && !localStorage.token) {
    return next('login')
  }
  // 如果有token,则默认请求获取数据
  if(localStorage.token) {
    store.dispatch('userInfo')
  }
  next()
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  render: h => h(App)
})
