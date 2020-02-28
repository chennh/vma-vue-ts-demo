import { GetterTree, Getter } from 'vuex'
import { State } from './state'
// import RbacResourceMenuBO from '@/api/manage/v1.0/definitions/RbacResourceMenuBO'

// 功能权限map
export const resourceActionMap: Getter<State, any> = (state: State) => {
  const actionMap = new Map<string, object>()
  // if (state.adminInfo && state.adminInfo.resourceActionList) {
  //   state.adminInfo.resourceActionList.forEach(action => {
  //     actionMap.set(action.code, action)
  //   })
  // }
  return actionMap
}
// 菜单权限map
export const resourceMenuMap: Getter<State, any> = (state: State) => {
  const menuMap = new Map<string, object>()
  // if (state.adminInfo && state.adminInfo.resourceMenuList) {
  //   function loopMenu(menuList: RbacResourceMenuBO[]) {
  //     menuList.forEach(menu => {
  //       menuMap.set(menu.code, menu)
  //       if (menu.node && menu.node.length) {
  //         loopMenu(menu.node)
  //       }
  //     })
  //   }
  //   loopMenu(state.adminInfo.resourceMenuList)
  // }
  return menuMap
}

const getterTree: GetterTree<State, any> = {
  resourceActionMap,
  resourceMenuMap
}

export default getterTree

