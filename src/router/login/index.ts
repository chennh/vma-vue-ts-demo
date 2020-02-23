import * as types from './types'
import { RouterWrapper } from '@/utils'

export default new RouterWrapper(types, [{
  path: '/login/system',
  name: types.SYSTEM,
  component: () => RouterWrapper.resolveRouterComponent(import('@/pages/login/systemLogin.vue')),
}])
