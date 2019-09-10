import * as types from './mutationTypes'
import { State } from './state'

export default {
  [types.DEMO](state: State, version: string) {
    state.version = version
  }
}
