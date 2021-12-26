// index.js
import Mock from 'mockjs' // 导入mock模块
import api from '@/api' // 导入前面创建好的api(@为src目录，import的方式导入api模块默认会加载api/index.js)
import baseUrl from '@/lib/base_url' // 导入前面创建的baseUrl模块

/**
 * 将字符串url转换为正则匹配
 * 转正则的原因：如果url是字符串类型，默认会完全匹配mock地址与应用请求地址，参数不同也会造成mock拦截失效，解决方式就是用正则匹配
 * @param {String} url 接口地址
 * @return {RegExp} 返回正则匹配规则
 */
function regUrl (url) {
  const urlStr = baseUrl() + url + '.*'
  return RegExp(urlStr)
}

// 拦截接口，模拟接口数据
Mock.mock(regUrl(api.LOGIN), /get|post/i, {
  code: 0,
  msg: 'Mock接口模拟数据',
  data: [1, 2, 3, 4, 5]
})
