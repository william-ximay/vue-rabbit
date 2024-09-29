import httpInstance from "@/utils/http"
/**
 * @description 获取导航栏分类页面数据
 * @param {*} id 导航栏分类id
 * @returns 
 */
export function getCategory (id) {
  return httpInstance({
    url: '/category',
    params: {
      id
    }
  })
}
/**
 * @description 获取导航栏分类页面二级分类
 * @param {*} id 页面id 
 */
export function getCategorySub (id) {
  return httpInstance({
    url: '/category/sub/filter',
    params: {
      id
    }
  })
}
/**
 * @description 获取导航栏分类页面二级分类数据
 * @data { 
 *  categoryId: 0000000,
 *  page: 1,
 *  pageSize: 20,
 *  sortFiled: 'publishTime' | 'orderNum' | 'evaluateNum'
 * }
 */
export function getSubCategory (data) {
  return httpInstance({
    url: '/category/goods/temporary',
    method: 'post',
    data
  })
}