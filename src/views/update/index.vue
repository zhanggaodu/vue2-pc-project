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
// worker-->indexdb
// import * as SparkMD5 from 'spark-md5'
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
    // console.log(window.indexedDB)// IDBFactory{}
    const request = window.indexedDB.open('MyTestDatabase')

    // error: null
    // onblocked: null
    // onerror: null
    // onsuccess: null
    // onupgradeneeded: null
    // readyState: "done"
    // result: IDBDatabase {name: "MyTestDatabase", version: 1, objectStoreNames: DOMStringList, onabort: null, onclose: null, …}
    // source: null
    // transaction: null
    request.onerror = function (event) {
    }
    request.onsuccess = function (event) {

    }
    // 创建或者删除对象存储空间
    // https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%B3%E9%97%AD%E8%AD%A6%E5%91%8A
    request.onupgradeneeded = function (event) {
      const customerData = [
        { ssn: '444-44-4444', name: 'Bill', age: 35, email: 'bill@company.com' },
        { ssn: '555-55-5555', name: 'Donna', age: 32, email: 'donna@home.org' }
      ]
      var db = event.target.result
      // 建立一个对象仓库来存储我们客户的相关信息，我们选择 ssn 作为键路径（key path）
      // 因为 ssn 可以保证是不重复的
      var objectStore = db.createObjectStore('customers', { keyPath: 'ssn' })

      // 建立一个索引来通过姓名来搜索客户。名字可能会重复，所以我们不能使用 unique 索引
      objectStore.createIndex('name', 'name', { unique: false })

      // 使用邮箱建立索引，我们向确保客户的邮箱不会重复，所以我们使用 unique 索引
      objectStore.createIndex('email', 'email', { unique: true })

      // 使用事务的 oncomplete 事件确保在插入数据前对象仓库已经创建完毕
      objectStore.transaction.oncomplete = function (event) {
        // 将数据保存到新创建的对象仓库
        var customerObjectStore = db.transaction('customers', 'readwrite').objectStore('customers')
        customerData.forEach(function (customer) {
          customerObjectStore.add(customer)
        })
      }
    }
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
