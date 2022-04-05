<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
    >
      <div class="logo" />
      <a-menu theme="dark" mode="inline">
        <a-menu-item v-for="item in menu.home" :key="item.path">
          <router-link v-if="item.path" :to="item.path">
            <a-icon type="user" />
            <span class="nav-text">{{ item.name }}</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <a-row>
          <a-col :span="12">
            <a-radio-group :default-value="null" @change="changeLocale">
              <a-radio-button key="en" :value="null"> English </a-radio-button>
              <a-radio-button key="cn" :value="zhCN">
                中文
              </a-radio-button> </a-radio-group
            >{{ $t(home) }}</a-col
          >
          <a-col class="textAligin" :offset="6" :span="6">
            <span>用户名：{{ getName }}</span>
            <a-button @click="loginOut"> 退出登录 </a-button>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <a-breadcrumb>
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>
            <!-- <router-link to=""
              >Application Center</router-link
            > -->
          </a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', textAlign: 'center' }"
        >
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
          <totop></totop>
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>

import mixin from '@/plugin/vue-extend.js'
import { toClearLocalStroage } from '@/plugin/local-stroage'
import { mapGetters } from 'vuex'
import zhCN from '@/lang/zh-cn'
import { menu } from '@/mock/menu'
import totop from '@/components/to-top/index'

export default {
  name: 'Home',
  components: { totop },
  mixins: [mixin],
  data () {
    this.zhCN = zhCN
    return {
      home: this.$t('title1'),
      selfWatch: 1,
      menu: menu
    }
  },
  watch: {
    selfWatch: function (val, oldVal) {
      console.log('执行watch')
      console.log('new: %s, old: %s', val, oldVal)
    },
    immediate: true,
    deep: true
  },
  computed: {
    selfComputed: (vm) => {
      console.log('执行computed')// 一进页面就会打印
      return vm.home + ' is com'// 必须要有return 要不然页面不响应
    },
    ...mapGetters([
      'getName'
    ])
  },
  methods: {
    onCollapse (collapsed, type) {
      console.log(collapsed, type)
    },
    onBreakpoint (broken) {
      console.log(broken)
    },
    changeLocale (e) {
      const localeValue = e.target.value

      this.locale = localeValue
      if (!localeValue) {
        this.i18n.locale = 'en-us'
      } else {
        this.i18n.locale = 'zh-cn'
      }
    },
    loginOut () {
      toClearLocalStroage()
      this.$router.push({ name: 'Login' })
    },
    isDashboard (route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    }
  },
  created () {
  },

  mounted () {
  }

}
</script>

<style scoped lang="scss">
.full-screen {
  $fill-height: 100vh;
  height: $fill-height;
  overflow: auto;
}
.textAligin {
  text-align: center;
}
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
