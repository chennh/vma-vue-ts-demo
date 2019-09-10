import Vue from 'vue'
import Router from 'vue-router'
import * as types from './types'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: types.HOME,
      component: () => import('@/pages/home/index.vue'),
    },
    {
      path: '/about',
      name: types.ABOUT,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/pages/about.vue'),
    },
  ]
})
