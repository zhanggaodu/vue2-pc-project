import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isFirst: false
  },
  getters: {
    ifFirstOpen (state) {
      return state.isFirst
    }
  },
  mutations: {
    changeOpenStatus (status) {
      this.isFirst = status
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
