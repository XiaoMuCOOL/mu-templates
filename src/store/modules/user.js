'use strict'
import Axios from "../../common/axios"
import API from '../../common/api'

// 初始化数据
const state = {
  user: {
    nickName: 'aaa',
    token: ''
  }
}

// getters
const getters = {
  user: state => state.user,
  nickName: state => state.user.nickName,

  userRegDate: (state, getters, rootState) => {
    return new Date(state.user.userRegDate).toLocaleTimeString()
  }
}

// actions: 异步方法
const actions = {
  async login ({ commit }, postData) {
    let user = await Axios.post(API.login, postData)
    commit('login', user)
  },
  async userInfo ({ commit }) {
    let user = await Axios.post(API.userInfo)
    commit('userInfo', user)
  }
}

// mutations: 同步并且操作数据的方法
const mutations = {
  login (state, user) {
    state.user = user
    localStorage.setItem('token', user.token)
  },
  userInfo (state, user) {
    state.user = user
  },
  logout () {
    state.user = {}
    localStorage.clear()
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
