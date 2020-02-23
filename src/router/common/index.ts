import * as types from './types'
import { RouterWrapper } from '@/utils'

export default new RouterWrapper(types, [{
  path: '*',
  name: types.PAGE404,
  component: () => RouterWrapper.resolveRouterComponent(import('@/pages/common/404.vue'))
},
{
  path: '/common/maintain',
  name: types.MAINTAIN,
  component: () => RouterWrapper.resolveRouterComponent(import('@/pages/common/maintain.vue'))
}])
