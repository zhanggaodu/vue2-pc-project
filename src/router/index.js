import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'

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

  }, {
    path: '/echarts',
    name: 'Echarts',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/system/index.vue')
    },
    meta: [
      { name: '项目分类', url: '/list' },
      { name: '项目列表', url: '/type/list' },
      { name: '详情' }
    ]
  },
  {
    path: '/webgl',
    name: 'Webgl',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/system/index.vue')
    },
    meta: {
      title: '可视化开发'
    }
  },

  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  console.log(to.meat)
  if (to.name !== 'Login' && !store.getters.ifFirstOpen) {
    next({ name: 'Login' })
  }
  next()
})

export default router
