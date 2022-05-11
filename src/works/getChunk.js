// 大文件获取hash值 及 文件分块
// import * as SparkMD5 from 'spark-md5'
// npm install worker-loader --save-dev
// self.importScripts('spark-md5')
// Uncaught SyntaxError: Unexpected token '<'
addEventListener('message', function (e) {
  console.log('worker', e)
  const file = e.file
  const chunkSize = 5 * 1024// e.chunkSize 优化----tcp慢启动
  // return new Promise((resovle) => {
  const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
  const chunks = Math.ceil(file.size / chunkSize)
  let currentChunk = 0
  const spark = new self.SparkMD5.ArrayBuffer()
  const fileReader = new FileReader()
  let percentage = 0
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
      self.postMessage({
        percentage: 100,
        hash: spark.end()
      })
      // resovle({ fileHash })
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
    percentage += 100 / chunk.length
    e.fileChunkList.push({ chunk, size: chunk.size, name: e.currFile.name })
    self.postMessage(percentage)
    fileReader.readAsArrayBuffer(chunk)
  }
  loadNext()
}, false)
// , (rejectd) => {

// })
// }
