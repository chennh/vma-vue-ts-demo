import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import types from './types'
import commonRoutes from './common'
import loginRoutes from './login'
import { isTypesRouter, resolveRouterComponent } from '@/utils'

Vue.use(Router)

const routes: RouteConfig[] = [
  ...loginRoutes,
  ...commonRoutes,
  {
    path: '/',
    component: () => resolveRouterComponent(import('@/pages/frame/index.vue')),
    children: []
  },
  {
    path: '*',
    redirect: '/login/system'
  }
]

export const isRouter = (routerName: string | undefined) => isTypesRouter(routerName, types)

export default new Router({
  routes
})
