import Vue from 'vue'
import Router from 'vue-router'
// 全加载
// import Index from '../views/Index'
// 懒加载
const Index = () => import('../views/Index')
const Reg = () => import('../views/Reg')
const Login = () => import('../views/Login')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      }
    }
  ]
})
