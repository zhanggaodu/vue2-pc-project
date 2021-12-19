import http from '@/plugin/axios'
export function fetchList (query) {
  return http({
    url: '/vue-pc-project/login',
    method: 'post',
    params: query
  })
}
