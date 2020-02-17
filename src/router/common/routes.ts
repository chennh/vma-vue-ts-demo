import types from './types'
import {
  resolveRouterComponent
} from '@/utils'

export default [{
  path: '*',
  name: types.PAGE404,
  component: () => resolveRouterComponent(import('@/pages/common/404.vue'))
},
{
  path: '/common/maintain',
  name: types.MAINTAIN,
  component: () => resolveRouterComponent(import('@/pages/common/maintain.vue'))
}]
