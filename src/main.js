import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugin/antd-desgin'

import 'ant-design-vue/dist/antd.css'// 解决babel-import不能自动引入css的问题
import 'normalize.css'
// 国际化
import VueI18n from 'vue-i18n'
import LangEnus from './lang/en-us'
import LangZhcn from './lang/zh-cn'

import { mockXHR } from '../mock'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh-cn',
  message: {
    en: LangEnus,
    zh: LangZhcn
  }
}
)
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
