import { GetterTree, Getter } from 'vuex'
import { State } from './state'

export const demo: Getter<State, any> = (state: State) => state.version

const getterTree: GetterTree<State, any> = {
  demo
}

export default getterTree

