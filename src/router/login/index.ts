import * as types from './types'
import { RouterWrapper } from '@/utils'

export default new RouterWrapper([{
  path: '/login/system',
  name: types.SYSTEM,
  component: () => RouterWrapper.resolveRouterComponent(import('@/pages/login/systemLogin.vue')),
}])
