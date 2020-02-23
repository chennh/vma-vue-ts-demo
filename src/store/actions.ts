import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import * as actionTypes from './actionTypes'
import * as mutationTypes from './mutationTypes'
// import { AccountApi } from '@/api/manage/v1.0/accountApi'
// import LoginBO from '@/api/manage/v1.0/definitions/LoginBO'
import {
  adminInfoSession,
  frameActiveMenuSession,
  macKeyCookie,
  broadcastLogoutLocal
} from '@/storage'
import {
  redirectToLogin
} from '@/router'
import {
  Notify
} from 'vma-vue-element'

const AccountApi = {
  logout(config: any): any { }
}
type LoginBO = any

const actions: ActionTree<State, any> = {
  // 登录后处理
  [actionTypes.AFTER_LOGIN]: (
    { commit }: ActionContext<State, any>,
    data: LoginBO) => {
    commit(mutationTypes.SET_ADMIN_INFO, data)
    adminInfoSession.setJSON(data)
    macKeyCookie.set(data.macKey)
  },
  // 登出后处理
  [actionTypes.AFTER_LOGOUT]: (
    { commit }: ActionContext<State, any>
  ) => {
    commit(mutationTypes.SET_ADMIN_INFO, {})
    adminInfoSession.remove()
    frameActiveMenuSession.remove()
    macKeyCookie.remove()
  },
  // 登出
  [actionTypes.LOGOUT]: (
    { dispatch }: ActionContext<State, any>,
    silence = false) => {
    dispatch(actionTypes.LOGOUT_BROADCAST, silence).then(() => {
      // 触发其他TAB的登出
      broadcastLogoutLocal.random()
    })
  },
  // 登出广播
  [actionTypes.LOGOUT_BROADCAST]: (
    { dispatch }: ActionContext<State, any>,
    silence = true) => {
    // 登出不论成功失败强制执行
    return AccountApi.logout({ errorHandle: false }).finally(() => {
      if (!silence) {
        Notify.success('登出成功')
      }
      dispatch(actionTypes.AFTER_LOGOUT)
      redirectToLogin()
    })
  }
}

export default actions
