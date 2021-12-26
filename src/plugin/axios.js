import baseUrl from '@/lib/base_url'
import axios from 'axios'
const http = axios.create({
  baseURL: baseUrl(), // process.env.BASE_API base_url api 的 'http://127.0.0.1:4523/mock/527017'
  timeout: 5000 // request timeout
})

// Add a request interceptor
axios.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      this.$message.info(res.message)

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 508 || res.code === 512 || res.code === 514) {
        // to re-login
        this.$confirm({
          title: 'You have been logged out',
          // content: h => <div style="color:red;">Some descriptions</div>,
          onOk () {
            console.log('OK')
          },
          onCancel () {
            console.log('Cancel')
          },
          class: 'test'
        })
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    this.$message.info(error)
    return Promise.reject(error)
  }
)

export default http
