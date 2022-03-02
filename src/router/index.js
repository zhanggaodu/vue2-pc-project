import Vue from 'vue'
import VueRouter from 'vue-router'
import { toGetLocalStroage } from '@/plugin/local-stroage.js'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   }
  // }
  {
    path: '/login',
    name: 'Login',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Login.vue')
    }
  },
  {
    path: '/',
    name: 'Home',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/system/index.vue')
    },
    meta: {
      title: '主页'
    }
  },
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  console.log(toGetLocalStroage('user'))
  if (toGetLocalStroage('user') && from.path !== '/login') {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

export default router
