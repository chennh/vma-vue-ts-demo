import * as types from './mutationTypes'
import { State } from './state'
// import LoginBO from '@/api/manage/v1.0/definitions/LoginBO'

type LoginBO = any

export default {
  [types.DEMO](state: State, version: string) {
    state.version = version
  },

  /**
   * 设置当前登录用户
   *
   * @param {State} state
   * @param {LoginBO} data
   */
  [types.SET_ADMIN_INFO](state: State, data: LoginBO) {
    state.adminInfo = Object.assign({}, data)
  }
}
