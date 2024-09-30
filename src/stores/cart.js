//购物车数据
import { defineStore } from "pinia"
import { ref } from "vue"

const setLocalStorage = (data) => {
  localStorage.setItem('allCartList', JSON.stringify(data))
}

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('allCartList'))
}

export const useCartStore = defineStore('cart', () => {
  // 购物车列表 state
  const allCartList = ref(getLocalStorage() || [])
  // action
  const addAllCartList = (cartData) => {
    const item = allCartList.value.find(item => cartData.skuId === item.skuId)
    if (item) {
      item.count += cartData.count
    } else {
      allCartList.value.push(cartData)
    }
    setLocalStorage(allCartList.value)
  }
  return { allCartList, addAllCartList}
})