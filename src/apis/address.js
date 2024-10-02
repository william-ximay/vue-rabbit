import httpInstance from '@/utils/http.js'
export function addAddress (data) {
  return httpInstance({
    url: '/member/address',
    method: 'post',
    data
  })
}