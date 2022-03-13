import baseUrl from '@/lib/base_url'
import axios from 'axios'
const http = axios.create({
  baseURL: baseUrl(), // process.env.BASE_API base_url api 的 'http://127.0.0.1:4523/mock/527017'
  timeout: 5000 // request timeout
})

// Add a request interceptor
axios.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      this.$message.info(res.message)
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
