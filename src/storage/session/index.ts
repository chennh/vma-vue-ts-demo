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

// 当前登录用户
export const adminInfoSession = new storage.SessionItem({
  name: names.ADMIN_INFO
})
// 当前对象中是否有存储着正确的用户数据
export const adminInfoSessionHasData = () => {
  const adminInfo = adminInfoSession.getJSON()
  return !!(adminInfo && adminInfo.macKey)
}

// 当前激活的菜单
export const frameActiveMenuSession = new storage.SessionItem({
  name: names.FRAME_ACTIVE_MENU
})
