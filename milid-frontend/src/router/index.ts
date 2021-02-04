import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Landing from '../views/Landing.vue'
import Home from '../views/Home.vue'

import { $config } from '@/services/config-service'
import { $module } from '@/services/module-service'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    beforeEnter:(to: any, from: any, next: any) => {
      $config.get().then(next)
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter:(to: any, from: any, next: any) => {
      const load = [$config.get(),$module.getAll()]
      Promise.all(load).then(next);
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
