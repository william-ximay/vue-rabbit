import httpInstance from '@/utils/http.js'
export function getBanner (params = {}) {
  const { distributionSite = '1'} = params
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite
    }
  })
}