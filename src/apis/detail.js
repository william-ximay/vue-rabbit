import httpInstance from '@/utils/http.js'
export function getDetail (id) {
  return httpInstance({
    url: '/goods',
    params: {
      id
    }
  })
}
export function getDetailHot ({id, type, limit = 3}) {
  return httpInstance({
    url: '/goods/hot',
    params: {
      id, 
      type, 
      limit
    }
  })
}