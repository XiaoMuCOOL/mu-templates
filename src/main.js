// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Vux from 'vux';

// Vue.use(Vux);
//按需引入
// import { Button, Table } from 'iview';
// Vue.component('Button', Button);
// Vue.component('Table', Table)

/**
 * axios
 */
// import Axios from 'axios'
// Vue.prototype.axios = Axios

/**
 * 路由发生变化修改页面title
 */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  render: h => h(App)
})
