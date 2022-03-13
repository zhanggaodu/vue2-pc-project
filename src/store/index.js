import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    isFirst: false
  },
  getters: {
    getName (state) {
      return state.name
    },
    ifFirstOpen (state) {
      return state.isFirst
    }
  },
  mutations: {
    changeOpenStatus (state, status) {
      state.isFirst = status
    },
    changeName (state, name) {
      state.name = name
    }
  },
  actions: {
    changeOpenStatusSync (status) {
      this.isFirst = status
    }
  },
  modules: {
  }
})
