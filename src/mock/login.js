import http from '@/plugin/axios'
export function fetchList(query) {
  return http({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}
