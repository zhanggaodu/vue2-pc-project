import Vue from 'vue'
import {
  DatePicker, Layout, Form, Input, Button, Checkbox, Menu, Icon,
  ConfigProvider, Radio, message, Modal, Breadcrumb, Col, Row, Upload
} from 'ant-design-vue'
// Vue.component('DatePicker', DatePicker)
Vue.use(DatePicker)
Vue.use(Layout)
Vue.use(Input)
Vue.use(Form)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(ConfigProvider)
Vue.use(Radio)
Vue.use(message)
Vue.use(Modal)
Vue.use(Breadcrumb)
Vue.use(Col)
Vue.use(Row)
Vue.use(Upload)
message.config({
  top: '500px',
  duration: 2,
  maxCount: 3
})
