// 订单页
import httpInstance from "@/utils/http"
export function getCheckOut () {
  return httpInstance({
    url: '/member/order/pre'
  })
}
// 创建支付订单
export function toPay (data) {
  return httpInstance({
    url: '/member/order',
    method: 'post',
    data
  })
}