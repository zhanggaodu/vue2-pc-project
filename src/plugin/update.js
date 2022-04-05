// // 上传文件
// import * as SparkMD5 from 'spark-md5'
// // 获取文件分块 计算hash值
// // 默认分块大小
// const DefualtChunkSize = 5 * 1024 * 1024
// // 当前处理文件
// const currFile = {}
// // 当前文件分块
// const fileChunkList = []
// // 文件变化
// export const fileChange = async (event) => {
//   const [file] = event.target.files
//   if (!file) return
//   currFile.value = file
//   fileChunkList.value = []
//   const { fileHash } = await getFileChunk(file)
//   uploadChunks(fileHash)
// }
// // 上传请求
// const uploadChunks = (fileHash) => {
//   const requests = fileChunkList.value.map((item, index) => {
//     const formData = new FormData()
//     formData.append(`${currFile.value.name}-${fileHash}-${index}`, item.chunk)
//     formData.append('filename', currFile.value.name)
//     formData.append('hash', `${fileHash}-${index}`)
//     formData.append('fileHash', fileHash)
//     return uploadFile('/upload', formData, onUploadProgress(item))
//   })
//   Promise.all(requests).then(() => {
//     // 合并请求
//     // mergeChunks('/mergeChunks', { size: DefualtChunkSize, filename: currFile.value.name })
//   })
// }
// // 获取文件分块
// const getFileChunk = (file, chunkSize = DefualtChunkSize) => {
//   return new Promise((resovle) => {
//     const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
//     const chunks = Math.ceil(file.size / chunkSize)
//     let currentChunk = 0
//     const spark = new SparkMD5.ArrayBuffer()
//     const fileReader = new FileReader()
//     fileReader.onload = function (e) {
//       console.log('read chunk nr', currentChunk + 1, 'of')
//       const chunk = e.target.result
//       spark.append(chunk)
//       currentChunk++
//       if (currentChunk < chunks) {
//         loadNext()
//       } else {
//         const fileHash = spark.end()
//         console.info('finished computed hash', fileHash)
//         resovle({ fileHash })
//       }
//     }
//     fileReader.onerror = function () {
//       console.warn('oops, something went wrong.')
//     }
//     function loadNext () {
//       const start = currentChunk * chunkSize
//       const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
//       const chunk = blobSlice.call(file, start, end)
//       fileChunkList.value.push({ chunk, size: chunk.size, name: currFile.value.name })
//       fileReader.readAsArrayBuffer(chunk)
//     }
//     loadNext()
//   }, (reject) => {
//     console.log(reject)
//   })
// }
// // 总进度条
// export const totalPercentage = () => {
//   if (!fileChunkList.value.length) return 0
//   const loaded = fileChunkList.value
//     .map(item => item.size * item.percentage)
//     .reduce((curr, next) => curr + next)
//   return parseInt((loaded / currFile.value.size).toFixed(2))
// }
