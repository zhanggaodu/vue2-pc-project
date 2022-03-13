<template>
  <a-layout id="components-layout-demo-responsive">
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <h5>登录</h5>
      <a-form-item>
        <a-input
          v-decorator="[
            'userName',
            {
              rules: [
                { required: true, message: 'Please input your username!' },
              ],
            },
          ]"
          placeholder="Username"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            },
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            },
          ]"
        >
          Remember me
        </a-checkbox>
        <a class="login-form-forgot" href=""> Forgot password </a>
        <a-button type="primary" html-type="submit" class="login-form-button">
          Log in
        </a-button>
        Or
        <a href=""> register now! </a>
      </a-form-item>
    </a-form>
  </a-layout>
</template>

<script>
import { toSetLocalStroage } from '@/plugin/local-stroage.js'
import { mapGetters } from 'vuex'
// import { meun } from '@/mock/meun'
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 24 }
}
const formTailLayout = {
  labelCol: { span: 1 },
  wrapperCol: { span: 19, offset: 4 }
}
export default {
  data () {
    return {
      formLayout: 'horizontal',
      /*
      表单de三种布局horizontal vertical inline 这三个必须一起使用
       :label-col="formItemLayout.labelCol"  :wrapper-col="formItemLayout.wrapperCol"
      */
      formItemLayout,
      formTailLayout
    }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'ifFirstOpen'
    ])
  },
  watch: {
    from () {
      if (this.ifFirstOpen) {
        this.from.userName = this.getName
      }
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = { user: 'admin' }
          this.$http.get(this.$api.LOGIN, params)
            .then((resolve, reject) => {
              console.log(resolve)
              if (resolve.status === 200) {
                toSetLocalStroage('user', values.userName)
                this.$store.commit('changeOpenStatus', true)
                this.$store.commit('changeName', values.userName)
                this.$router.push({ path: '/' })
              }
            })
        }
      })
    }

  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  }
}
</script>

<style scoped lang="scss">
.ant-layout {
  width: 100%;
  height: 100vh; //vh是height of view(port)的缩写； vw是width of view(port)的缩写；
  position: relative;
  .login-form {
    width: 500px;
    height: 300px;
    margin: calc((100vh - 300px) / 2) auto 0;
    border: 1px solid #999999;
    border-radius: 10px;
    box-shadow: 1px 1px 5px #666666;
    text-align: center;
    h5 {
      font-size: 26px;
      color: cornflowerblue;
    }
  }
}
</style>
