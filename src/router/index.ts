import Vue from 'vue'
import VueRouter from 'vue-router'
import commonRouterWrapper from './common'
import loginRouterWrapper from './login'
import frameRouterWrapper from './router'
import { adminInfoSession, adminInfoSessionHasData } from '@/storage'
// import LoginBO from '@/api/common/v1.0/definitions/LoginBO'
import { RouterWrapper } from '@/utils'
import {
  Notify
} from 'vma-vue-element'
// import { AccountApi } from '@/api/common/v1.0/accountApi'
import store from '@/store'
import * as actionTypes from '@/store/actionTypes'

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
export function shouldRedirectToLogin(routerName: string | null | undefined) {
  return !commonRouterWrapper.isRouter(routerName) && !loginRouterWrapper.isRouter(routerName)
}

/**
 * 是否拥有菜单权限
 * @param {*} routerName
 * @param {*} params
 */
const excludedMenuList: any[] = []
export function hasMenuPermission(routerName: string | null | undefined, params: any[]): boolean {
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

router.beforeEach((to, from, next) => {

  /**
   * 重定向到登录页或进入下一个路由
   *
   * @returns
   */
  function redirectToLoginOrNext() {
    // 用户未登录
    if (shouldRedirectToLogin(to.name)) {
      return redirectToLogin()
    } else {
      next()
    }
  }

  // 已登录
  if (adminInfoSessionHasData()) {
    // 需要重定向到后台首页
    // 1、前往的是登录页
    if (loginRouterWrapper.isRouter(to.name)) {
      return redirectToHome()
    }

    const adminInfo = adminInfoSession.getJSON()
    // 2、没有菜单权限
    // 3、前往的后台地址和当前登录类型不匹配
    if (!hasMenuPermission(to.name, adminInfo.resourceMenuList) ||
      !RouterWrapper.isRouterExists(to.name)) {
      Notify.warn('没有当前菜单权限')
      return redirectToHome()
    }
    return next()
  } else {
    // 用户未登录
    // 同步一次服务端用户数据，确认是否未登录，以服务端用户数据为准
    // AccountApi.menuList({ loading: false, errorHandle: false }).then(data => {
    //   if (data && data.macKey) {
    //     store.dispatch(actionTypes.AFTER_LOGIN, data)
    //     if (loginRouterWrapper.isRouter(to.name)) {
    //       return redirectToHome()
    //     }
    //     return next()
    //   } else {
    //     return redirectToLoginOrNext()
    //   }
    // }, err => {
    //   redirectToLoginOrNext()
    //   Promise.reject(err)
    // })
    next()
  }
})

router.afterEach(route => {
  window.scrollTo(0, 0)
})

export default router
