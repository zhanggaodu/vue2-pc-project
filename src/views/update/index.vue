<template>
  <div>
    <a-upload
      name="file"
      :multiple="true"
      :headers="headers"
      :before-upload="beforeUpload"
    >
      <!-- action="https://localhost/update"  @change="handleChange" -->
      <a-button> <a-icon type="upload" /> Click to Upload </a-button>
    </a-upload>
    <!-- <h2>总进度：{{ totalPercentage }} %</h2> -->
  </div>
</template>
<script>
// import * as SparkMD5 from 'spark-md5'
import { InitIndexDB } from '@/plugin/indexdb.js'
export default {
  components: {},
  data () {
    this.DefualtChunkSize = 5 * 1024 * 1024// 默认分块大小
    return {
      headers: { // 上传的请求头部 ie10
        authorization: 'authorization-text'
      },
      currFile: {}, // 当前处理文件
      // 当前文件分块
      fileChunkList: []
    }
  },
  computed: { // 总进度条
    // totalPercentage: () => {
    //   if (!this.fileChunkList.length) return 0
    //   const loaded = this.fileChunkList.value
    //     .map(item => item.size * item.percentage)
    //     .reduce((curr, next) => curr + next)
    //   return parseInt((loaded / this.currFile.value.size).toFixed(2))
    // }
  },
  mounted () {
    const db = new InitIndexDB(this)
    db.open()

    db.init('FileData', 'id')
    db.addData({ id: '242', name: 'ddd' })
  },
  methods: {
    beforeUpload (info) {
      console.log(info)
      this.currFile = info
      // 文件分块并加密
      // async异步接收数据
      const works = new Worker('@/works/getChunks.js')
      console.log(works)
      works.postMessage(this.currFile)
      works.onmessage = e => {
        console.log(e)
      }
      works.onerror = e => { }
      // 终止worker works.terminate()
      return false

      // 秒传：上传文件之前先判断hash之前有没有 如果有的话就秒传
      // 断点重传：本地数据库存储的时候应该用LRU算法进行优化
    },
    async handleChange (info) { // 文件变化
      this.currFile = info.file.originFileObj
      this.fileChunkList = info.fileList
    },
    // 上传请求
    uploadChunks (fileHash) {
      const requests = this.fileChunkList.value.map((item, index) => {
        const formData = new FormData()
        formData.append(`${this.currFile.value.name}-${fileHash}-${index}`, item.chunk)
        formData.append('filename', this.currFile.value.name)
        formData.append('hash', `${fileHash}-${index}`)
        formData.append('fileHash', fileHash)
        console.log(formData)
        // return uploadFile('/upload', formData, onUploadProgress(item))
      })
      Promise.all(requests).then(() => {
        // 合并请求
        // mergeChunks('/mergeChunks', { size: DefualtChunkSize, filename: currFile.value.name })
      })
    },

    // 分块进度条
    onUploadProgress (item, e) {
      item.percentage = parseInt(String((e.loaded / e.total) * 100))
    },
    // handleChange (info) {
    //   if (info.file.status !== 'uploading') {
    //     console.log(info.file, info.fileList)
    //   }
    //   if (info.file.status === 'done') {
    //     this.$message.success(`${info.file.name} file uploaded successfully`)
    //   } else if (info.file.status === 'error') {
    //     this.$message.error(`${info.file.name} file upload failed.`)
    //   }
    // },
    updateFile () {
      // this.$http.post(this.$api.UPDATE, params, onUploadProgress)
      //   .then((resolve, reject) => {
      //     console.log(resolve)
      //     if (resolve.status === 200) {

      //     }
      //   })
    }
  }
}

</script>

<style lang='' scoped>
</style>
