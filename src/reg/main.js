'use strict'
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import Index from './views/Index'
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

Vue.use(Router)
const router = new Router({
  routes: [
  { 
    path: '/', 
    component: Index 
  }
]})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  render: h => h(App)
})
