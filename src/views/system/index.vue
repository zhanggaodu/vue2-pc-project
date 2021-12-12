<template>
   <a-layout id="components-layout-demo-responsive">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['4']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span class="nav-text">nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span class="nav-text">nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span class="nav-text">nav 3</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="user" />
          <span class="nav-text">nav 4</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }" >
         <a-radio-group :default-value="null" @change="changeLocale">
        <a-radio-button key="en" :value="null">
          English
        </a-radio-button>
        <a-radio-button key="cn" :value="zhCN">
          中文
        </a-radio-button>
        </a-radio-group>{{$t(home)}}
        </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          content
        </div>
      </a-layout-content>
      <a-layout-footer style="textAlign: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default {
  components: {},
  props: {},
  data () {
    return {
      locale: zhCN,
      zhCN,
      home: 'title.home'
    }
  },
  methods: {
    moment,
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
        moment.locale('en')
        this.i18n.locale = 'en-us'
      } else {
        moment.locale('zh-cn')
        this.i18n.locale = 'zh-cn'
      }
    }
  },
  created () {
  },
  mounted () { }
}
</script>

<style scoped lang="scss">

</style>
