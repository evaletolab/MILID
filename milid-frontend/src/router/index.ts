import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Landing from '../views/Landing.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Lesson from '../views/Lesson.vue'
import AccessDenied from '../views/AccessDenied.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Landing
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/module/:module_id/lesson/:lesson_id',
    name: 'Lesson',
    component: Lesson
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
  routes
})

export default router
