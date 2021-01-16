import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

let state = {
  todos: [{
    id: 1,
    text: 'first job'
  }]
}

export default new Vuex.Store({
  modules: {},
  state,
  getters,
  actions,
  mutations
})
