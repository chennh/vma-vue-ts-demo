import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import actions from './actions'
import getters from './getters'
import state, { State } from './state'
import mutations from './mutations'

Vue.use(Vuex)

const store: StoreOptions<State> = {
  state,
  mutations,
  actions,
  getters
}

export default new Vuex.Store<State>(store)
