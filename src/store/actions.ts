import { Action, ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import * as types from './mutationTypes'

const demo: Action<State, any> = (
  { commit }: ActionContext<State, any>,
  payload: string) => {
  commit(types.DEMO, payload)
}

const actions: ActionTree<State, any> = {
  demo
}

export default actions
