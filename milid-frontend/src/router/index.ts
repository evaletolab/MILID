import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Landing from '../views/Landing.vue'

import { $config } from '@/services/config-service'
import { $module } from '@/services/module-service'

import About from '../views/About.vue'
import Home from '../views/Home.vue'
import Lesson from '../views/Lesson.vue'
import AccessDenied from '../views/AccessDenied.vue'
import Test from '../views/Test.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/home',
    name: 'Home',
    redirect:'/module'
  },
  {
    path: '/module',
    name: 'Modules',
    component: Home,
    children:[{
      path: ':module_id/lesson/:lesson_id',
      name: 'Lesson',
      components: { l2 : Lesson}  
    }]
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/module-old/:module_id/lesson/:lesson_id',
    name: 'Lesson',
    components: { l2 : Lesson}
  },
  {
    path:'/access_denied',
    name: 'AccessDenied',
    component: AccessDenied
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    beforeEnter: (to, from, next) =>{
      next('/access_denied');
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition: any) {
    console.log("--DBG: route position",savedPosition);
    return savedPosition || {
      x:0,
      y:undefined
    };
  },

})

export default router
