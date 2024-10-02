import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getLogin } from '@/apis/user'
import { useCartStore } from './cart'
import { mergeCart  } from '@/apis/cartAPI'
import { mobileLogin } from '@/apis/mobile'
const setLocalStorage = (data) => {
  localStorage.setItem('userData',JSON.stringify(data))
}
const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}
export const useUserStore = defineStore('user', () => {
  //定义用户数据的state
  const userData = ref(getLocalStorage('userData') || {})
  console.log(userData)
  //定义获取数据的异步action account
  const getUserData = async ({account, password}) => {
    const res = await getLogin({account, password})
    userData.value = res.data.result
    setLocalStorage(userData.value)
    // 合并购物车
    await mergeCart(useCartStore().allCartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    await useCartStore().getCartAPI()
  }
  //定义获取数据的异步action mobile
  const getUserDataMobile = async ({mobile, captcha}) => {
    const res = await mobileLogin({mobile: mobile, code: captcha})
    userData.value = res.data.result
    setLocalStorage(userData.value)
    // 合并购物车
    await mergeCart(useCartStore().allCartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    await useCartStore().getCartAPI()
  }
  // 退出时清除用户数据
  const clearUserData = () => {
    userData.value = {}
    localStorage.removeItem('userData')
    useCartStore().deleteAll()
  }
  return { userData, getUserData, clearUserData, getUserDataMobile }
})