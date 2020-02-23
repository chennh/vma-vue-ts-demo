import Vue from 'vue'
import VueRouter from 'vue-router'
import commonRouterWrapper from './common'
import loginRouterWrapper from './login'
import frameRouterWrapper from './router'
import store from '@/store'
import * as actionTypes from '@/store/actionTypes'
import { Notify } from 'vma-vue-element'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: frameRouterWrapper.routes
})

/**
 * 重定向到主页
 *
 * @export
 */
export function redirectToHome() {
  router.push({ name: frameRouterWrapper.types.SYSTEM })
}

/**
 * 重定向到登录页
 *
 * @export
 */
export function redirectToLogin() {
  router.push({ name: loginRouterWrapper.types.SYSTEM })
}

/**
 * 重定向到维护中页面
 *
 * @export
 */
export function redirectToCommonMaintain() {
  router.push({
    name: commonRouterWrapper.types.MAINTAIN
  })
}

/**
 * 根据路由名称是否需要重定向到登录页
 * @param routerName
 */
export function shouldRedirectToLogin(routerName: string | undefined) {
  return !commonRouterWrapper.isRouter(routerName) && !loginRouterWrapper.isRouter(routerName)
}

/**
 * 是否拥有菜单权限
 * @param {*} routerName
 * @param {*} params
 */
const excludedMenuList: any[] = []
export function hasMenuPermission(routerName: string | undefined, params: any[]): boolean {
  if (routerName &&
    !commonRouterWrapper.isRouter(routerName) &&
    !frameRouterWrapper.isRouter(routerName) &&
    !excludedMenuList.includes(routerName) &&
    params && params.length) {
    return params.some(menu => {
      if (menu.url === routerName) {
        return true
      } else if (menu.node && menu.node.length) {
        return hasMenuPermission(routerName, menu.node)
      }
    })
  }
  return true
}

router.afterEach(route => {
  window.scrollTo(0, 0)
})

export default router
