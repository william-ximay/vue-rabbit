//与用户相关的接口数据
import httpInstance from "@/utils/http";
export function getLogin ({account, password}) {
  return httpInstance({
    url: '/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}