import {
  storage
} from 'vma-vue-assist'
import * as names from './names'

/*
    property
      name        [String] 名称
      encrypt     [Boolean] 存储时是否加密
      namespace   [String|Function] 命名空间，存储时会添加命名空间
    method
      set(data)             [any] 存储数据
      get()                 [void]  取数据
      setByNamespace(data)  [any] 添加命名空间存储数据
      getByNamespace()      [void]  读取命名空间下的数据
      setJSON(data)         [JSONObject]  存储json
      getJSON()             [void] 取json
      remove()              [void]  删除存储的数据
 */

// 登录页-记住我
export const loginRememberMeLocal = new storage.LocalItem({
  name: names.LOGIN_REMEMBER_ME
})
// 登录页-最后一次登录成功的账号
export const loginAccountLocal = new storage.LocalItem({
  name: names.LOGIN_ACCOUNT
})
// 登出事件广播
export const broadcastLogoutLocal = new storage.LocalItem({
  name: names.BROADCAST_LOGOUT
})
// 登录事件广播
export const broadcastLoginLocal = new storage.LocalItem({
  name: names.BROADCAST_LOGIN
})
