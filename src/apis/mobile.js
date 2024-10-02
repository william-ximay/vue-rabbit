//登录手机号校验返回验证信息
import httpInstance from '@/utils/http.js'
export function mobileAPI (mobile) {
  return httpInstance({
    url: `/login/code`,
    method: 'get',
    params: {
      mobile: mobile
    }
  })
}
//手机号登录
export function mobileLogin (data) {
  return httpInstance({
    url: '/login/code',
    method: 'post',
    data
  })
}