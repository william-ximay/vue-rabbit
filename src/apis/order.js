// 会员中心个人订单详情
import httpInstance from '@/utils/http.js'
export function getOrder (params) {
  return httpInstance({
    url: '/member/order',
    method: 'get',
    params/* : {
      orderState: 0,
      page:1,
      pageSize: 2
    } */
  })
}