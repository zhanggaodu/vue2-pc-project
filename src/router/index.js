import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Login.vue')
    }
  },
  {
    path: '/home',
    // name: 'Home',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/system/index.vue')
    },
    meta: {
      title: '主页'
    }

  }, {
    path: '/',
    // name: 'echarts',echarts
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/echarts/index.vue')
    },
    meta: [
      // { name: '项目分类', url: '/list' },
      // { name: '项目列表', url: '/type/list' },
      // { name: '详情' }
    ]
  },
  {
    path: '/webgl',
    // name: 'webgl',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/webgl/index.vue')
    },
    meta: {
      title: '可视化开发'
    }
  },

  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  routes
  // mode: 'history'
})
router.beforeEach((to, from, next) => {
  console.log(to.meat)
  if (to.name !== 'Login' && !store.getters.ifFirstOpen) {
    next({ name: 'Login' })
  }
  next()
})

export default router
