import router, { isRouter as isFrameRouter } from './router'
import loginTypes from './login/types'
import commonTypes from './common/types'

/**
 * 重定向到主页
 *
 * @export
 */
export function redirectToHome() {
  router.push({
    // name: types.SYSTEM
  })
}

/**
 * 重定向到登录页
 *
 * @export
 */
export function redirectToLogin() {
  router.push({
    name: loginTypes.SYSTEM
  })
}

/**
 * 重定向到维护中页面
 *
 * @export
 */
export function redirectToCommonMaintain() {
  router.push({
    name: commonTypes.MAINTAIN
  })
}

router.afterEach(route => {
  window.scrollTo(0, 0)
})

export default router
