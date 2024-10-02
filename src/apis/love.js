import httpInstance from '@/utils/http.js'
export function getLove (limit) {
  return httpInstance({
    url: '/goods/relevant',
    params: {
      limit
    }
  })
}