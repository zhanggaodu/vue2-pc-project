
// eslint-disable-next-line no-unused-vars
export class InitIndexDB {
  open () {
    console.log('执行init')
    if (window.indexedDB) {
      this.request = window.indexedDB.open('File')
    } else {
      throw Error('没有indexdb')
    }
  }

  error () {
    this.request.onerror = function (event) {
      console.log('error', event)
    }
  }

  success () {
    this.request.onsuccess = function (event) {
      console.log('success', event)
    }
  }

  init (storeName, key) {
    this.request.onupgradeneeded = event => { // currentTarget
      this.store = event.target.result.createObjectStore(
        storeName, { keyPath: key, autoIncrement: true })
      console.log('init', this.store)
      // store.createIndex('biblioid', 'biblioid', { unique: true })
      // store.createIndex('title', 'title', { unique: false })
      // store.createIndex('year', 'year', { unique: false })
      // var db = event.target.result
      // // 建立一个对象仓库来存储我们客户的相关信息，我们选择 ssn 作为键路径（key path）
      // // 因为 ssn 可以保证是不重复的
      // var objectStore = db.createObjectStore('customers', { keyPath: 'ssn' })

      // // 建立一个索引来通过姓名来搜索客户。名字可能会重复，所以我们不能使用 unique 索引
      // objectStore.createIndex('name', 'name', { unique: false })

      // // 使用邮箱建立索引，我们向确保客户的邮箱不会重复，所以我们使用 unique 索引
      // objectStore.createIndex('email', 'email', { unique: true })
      // objectStore.transaction.onerror = function (event) {
      // }
      // // 使用事务的 oncomplete 事件确保在插入数据前对象仓库已经创建完毕
      // objectStore.transaction.oncomplete = function (event) {
      //   // 将数据保存到新创建的对象仓库
      //   // eslint-disable-next-line no-unused-vars
      //   var customerObjectStore = db.transaction('customers', 'readwrite').objectStore('customers')
      //   // customerData.forEach(function (customer) {
      //   //   customerObjectStore.add(customer)
      //   // })
      // }
    }
  }

  addData (data) { // store,
    console.log(this.store)
    // data.forEach(function (i) {
    //   var requestAdd = store.add(i)
    //   requestAdd.onerror = function (event) {
    //   }
    //   requestAdd.onsuccess = function (event) {
    //   }
    // })
  }

  deleteData (stroe, data) {
    var requestDelete = stroe.delete(data)
    requestDelete.onerror = function (event) {
    }
    requestDelete.onsuccess = function (event) {
    }
  }

  putData (stroe, data) {
    var requestUpdate = stroe.put(data)
    requestUpdate.onerror = function (event) {
    }
    requestUpdate.onsuccess = function (event) {
    }
  }
  // 向数据库中增加数据 var transaction = db.transaction(["customers"], "readwrite");
  // 向数据库中删除数据var request = db.transaction(["customers"], "readwrite")
  //              .objectStore("customers")
  //             .delete("444-44-4444");
  // request.onsuccess = function(event) {
  // 删除成功！
  // 向数据库中更新数据var requestUpdate = objectStore.put(data);
  //  requestUpdate.onerror = function(event) {
  //    // 错误处理
  //  };
  //  requestUpdate.onsuccess = function(event) {
  //    // 完成，数据已更新！
  //  };
}

// 创建或者删除对象存储空间
// https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%B3%E9%97%AD%E8%AD%A6%E5%91%8A
