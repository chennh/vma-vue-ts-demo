import * as types from './types'
import commonRouter from './common'
import loginRouter from './login'
import { RouterWrapper } from '@/utils'

export default new RouterWrapper(types, [
  ...loginRouter.routes,
  ...commonRouter.routes,
  {
    path: '/',
    component: () => RouterWrapper.resolveRouterComponent(import('@/pages/frame/index.vue')),
    children: []
  },
  {
    path: '*',
    redirect: '/login/system'
  }
])
