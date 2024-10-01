import httpInstance from '@/utils/http.js'
// 向购物车添加商品
export function addToCart ({ skuId, count }) {
  return httpInstance({
    url:'/member/cart',
    method: 'post',
    data: {
      skuId,
      count
    }
  })
}
// 获取最新购物车
export function getCart () {
  return httpInstance({
    url: '/member/cart'
  })
}
// 删除购物车指定商品
export function deleteCart (...ids) {
  return httpInstance({
    url: '/member/cart',
    method: 'delete',
    data: {
      ids
    }
  })
}
// 合并购物车
export function mergeCart (data) {
  return httpInstance({
    url: '/member/cart/merge',
    method: 'post',
    data
  })
}