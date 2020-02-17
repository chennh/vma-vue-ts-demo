import types from './types'
import { RouteConfig } from 'vue-router'
import {
  resolveRouterComponent
} from '@/utils'

const routes: RouteConfig[] = [{
  path: '/login/system',
  name: types.SYSTEM,
  component: () => resolveRouterComponent(import('@/pages/login/systemLogin.vue')),
}]

export default routes
