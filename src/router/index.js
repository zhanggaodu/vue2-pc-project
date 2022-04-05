import Vue from 'vue'
import VueRouter from 'vue-router'
import { toGetLocalStroage } from '@/plugin/local-stroage'
Vue.use(VueRouter)

const routeList = [
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
    },
    children: [
      {
        path: '/echarts',
        name: 'Echarts',
        component: function () {
          return import(/* webpackChunkName: "about" */ '../views/echarts/index.vue')
        },
        meta: [
          // { name: '项目分类', url: '/list' },
          // { name: '项目列表', url: '/type/list' },
          // { name: '详情' }
        ]
      }, {
        path: '/update',
        name: 'Update',
        component: function () {
          return import(/* webpackChunkName: "about" */ '../views/update/index.vue')
        }
      },
      {
        path: '/webgl',
        name: 'Webgl',
        component: function () {
          return import(/* webpackChunkName: "about" */ '../views/webgl/index.vue')
        },
        meta: {
          title: '可视化开发'
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  routes: routeList
  // mode: 'history'
})
router.beforeEach((to, from, next) => {
  console.log(toGetLocalStroage('name'))
  if (to.name !== 'Login' && toGetLocalStroage('name')) {
    next({ name: 'Login' })
  }
  next()
})

export default router
