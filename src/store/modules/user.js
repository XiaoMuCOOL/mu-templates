// initial state
// shape: [{ id, quantity }]
const state = {
  user: {}
}

// getters
const getters = {
  userName: state => state.user.userName,

  userRegDate: (state, getters, rootState) => {
    return new Date(state.user.userRegDate).toLocaleTimeString()
  }
}

// actions
const actions = {
  checkout ({ commit, state }, products) {
    const savedCartItems = [...state.added]
    commit('setCheckoutStatus', null)
  }
}

// mutations
const mutations = {
  pushProductToCart (state, { id }) {
    state.added.push({
      id,
      quantity: 1
    })
  },

  incrementItemQuantity (state, { id }) {
    const cartItem = state.added.find(item => item.id === id)
    cartItem.quantity++
  },

  setCartItems (state, { items }) {
    state.added = items
  },

  setCheckoutStatus (state, status) {
    state.checkoutStatus = status
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
