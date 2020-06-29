import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import actions from './actions'
import getters from './getters'
import state, { State } from './state'
import mutations from './mutations'
import { VuexWrapper } from 'vma-vue-assist/dist/static/js/tools/vuexWrapper'

Vue.use(Vuex)

const store: StoreOptions<State> = {
  state,
  mutations,
  actions,
  getters
}

export default new VuexWrapper<State>(store).store
