// bese-url.js

/* 输出接口baseUrl地址
  * @param { String } env 环境模式
  * @returns  { String } 环境模式对应的baseUrl
*/
export default function () {
  const env = process.env.NODE_ENV // 获取环境
  if (!env) {
    return ''
  }
  const envConfig = {
    development: 'http://localhost:8080/', // 开发环境
    production: 'http://www.lihefei.com/' // 生产环境
  }
  return envConfig[env]
}
