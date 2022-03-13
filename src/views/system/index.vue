<template>
<<<<<<< HEAD
  <a-layout id="components-layout-demo-top-side-2 full-screen">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1"> nav 1 </a-menu-item>
        <a-menu-item key="2"> nav 2 </a-menu-item>
        <a-menu-item key="3"> nav 3 </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="user" />subnav 1</span>
            <a-menu-item key="1">
              <a-icon type="upload" />
              <span class="nav-text">ui</span>
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="user" />
              <span class="nav-text">E-charts</span>
            </a-menu-item>
            <a-menu-item key="3">
              <a-icon type="video-camera" />
              <span class="nav-text">three.js</span>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="laptop" />subnav 2</span>
            <a-menu-item key="5"> option5 </a-menu-item>
            <a-menu-item key="6"> option6 </a-menu-item>
            <a-menu-item key="7"> option7 </a-menu-item>
            <a-menu-item key="8"> option8 </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title"><a-icon type="notification" />subnav 3</span>
            <a-menu-item key="9"> option9 </a-menu-item>
            <a-menu-item key="10"> option10 </a-menu-item>
            <a-menu-item key="11"> option11 </a-menu-item>
            <a-menu-item key="12"> option12 </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <!-- <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb> -->
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px',
          }"
        >
          Content{{ selfComputed }}---{{ selfWatch }}----{{ mixin }}{{ mix }}
          <button @click="change">点击</button>
        </a-layout-content>
      </a-layout>
=======
  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
    >
      <div class="logo" />
      <a-menu theme="dark" mode="inline">
        <a-menu-item v-for="item in menu" :key="item.path">
          <router-link :to="item.path">
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
          <a-breadcrumb-item
            ><router-link to=""
              >Application Center</router-link
            ></a-breadcrumb-item
          >
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', textAlign: 'center' }"
        >
          <roter-view></roter-view>
          ...
          <br />
          Really
          <br />...<br />...<br />...<br />
          long
          <br />...<br />...<br />...<br />...<br />...<br />...
          <br />...<br />...<br />...<br />...<br />...<br />...
          <br />...<br />...<br />...<br />...<br />...<br />...
          <br />...<br />...<br />...<br />...<br />...<br />...
          <br />...<br />...<br />...<br />...<br />...<br />...
          <br />...<br />...<br />...<br />...<br />...<br />...
          <br />...<br />...<br />...<br />...<br />...<br />
          content
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
>>>>>>> zgd
    </a-layout>
  </a-layout>
</template>
<script>
<<<<<<< HEAD
import mixin from '@/plugin/vue-extend.js'
=======
import { toClearLocalStroage } from '@/plugin/local-stroage'
import { mapGetters } from 'vuex'
import zhCN from '@/lang/zh-cn'
import { menu } from '@/mock/menu'
>>>>>>> zgd
export default {
  components: {},
  props: {},
  mixins: [mixin],
  data () {
    return {
<<<<<<< HEAD
      home: this.$t('title1'),
      selfWatch: 1
    }
  },
  computed: {
    selfComputed: (vm) => {
      console.log('执行computed')// 一进页面就会打印
      return vm.home + ' is com'// 必须要有return 要不然页面不响应
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

  methods: {
    change () {
      this.home = 'gggg'
      this.selfWatch = 2
      this.mixin = '更改后的mixin'
    },
=======
      home: 'title.home',
      zhCN: zhCN,
      menu: menu.home
    }
  },
  computed: {
    ...mapGetters([
      'getName'
    ])
  },
  methods: {
>>>>>>> zgd
    onCollapse (collapsed, type) {
      console.log(collapsed, type)
    },
    onBreakpoint (broken) {
      console.log(broken)
    },
    changeLocale (e) {
      const localeValue = e.target.value
<<<<<<< HEAD

      if (localeValue === 'ch') {
        this.$i18n.locale = 'zh'
      } else {
        this.$i18n.locale = 'en'
=======
      this.locale = localeValue
      if (!localeValue) {
        this.i18n.locale = 'en-us'
      } else {
        this.i18n.locale = 'zh-cn'
>>>>>>> zgd
      }
    },
    loginOut () {
      toClearLocalStroage()
      this.$router.push({ path: 'Login' })
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
<<<<<<< HEAD
  mounted () { console.log(this.$t('title')) }
=======
  mounted () {
    console.log(menu)
    console.log(this.$router)
  }
>>>>>>> zgd
}
</script>

<style scoped lang="scss">
<<<<<<< HEAD
.full-screen {
  $fill-height: 100vh;
  height: $fill-height;
  overflow: auto;
=======
.textAligin {
  text-align: center;
}
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
>>>>>>> zgd
}
</style>
