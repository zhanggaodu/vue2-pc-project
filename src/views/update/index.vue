<template>
  <div>
    <a-upload
      name="file"
      :multiple="true"
      :headers="headers"
      @change="handleChange"
    >
      <!-- action="https://localhost/update" -->
      <a-button> <a-icon type="upload" /> Click to Upload </a-button>
    </a-upload>
    <h2>总进度：{{ totalPercentage }} %</h2>
  </div>
</template>
<script>
import * as SparkMD5 from 'spark-md5'
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
    totalPercentage: () => {
      if (!this.fileChunkList.length) return 0
      const loaded = this.fileChunkList.value
        .map(item => item.size * item.percentage)
        .reduce((curr, next) => curr + next)
      return parseInt((loaded / this.currFile.value.size).toFixed(2))
    }
  },
  mounted () { },
  methods: {
    // 文件变化
    async handleChange (info) {
      console.log(info)
      // if (info.file.status === 'error') {
      //   // this.$message.error('This is an error message')
      // } else {
      this.currFile = info.file.originFileObj
      this.fileChunkList = info.fileList
      const { fileHash } = await this.getFileChunk(info.file.originFileObj)
      console.log(fileHash)
      // }
      // const [file] = event.target.files
      // if (!file) return
      // this.currFile.value = file
      // this.fileChunkList.value = []

      this.uploadChunks(fileHash)
    },
    // 获取文件分块
    getFileChunk (file, chunkSize = this.DefualtChunkSize) {
      const that = this
      return new Promise((resovle) => {
        const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
        const chunks = Math.ceil(file.size / chunkSize)
        let currentChunk = 0
        const spark = new SparkMD5.ArrayBuffer()
        const fileReader = new FileReader()
        fileReader.onload = function (e) {
          console.log('read chunk nr', currentChunk + 1, 'of')
          const chunk = e.target.result
          spark.append(chunk)
          console.log('spark', spark, 'of')
          currentChunk++
          if (currentChunk < chunks) {
            loadNext()
          } else {
            const fileHash = spark.end()
            console.info('finished computed hash', fileHash)
            resovle({ fileHash })
          }
        }
        fileReader.onerror = function () {
          console.warn('oops, something went wrong.')
        }
        function loadNext () {
          const start = currentChunk * chunkSize
          const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
          const chunk = blobSlice.call(file, start, end)
          console.log(chunk)
          that.fileChunkList.push({ chunk, size: chunk.size, name: that.currFile.name })
          fileReader.readAsArrayBuffer(chunk)
        }
        loadNext()
      }, (rejectd) => {

      })
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
