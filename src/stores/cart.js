//本地购物车数据
import { defineStore } from "pinia"
import { computed, ref } from "vue"
// 获取token以及接口数据
import { useUserStore } from './user.js'
import { addToCart, getCart, deleteCart } from "@/apis/cartAPI.js"
const isLogin = computed(() => useUserStore().userData.token)
const setLocalStorage = (data) => {
  localStorage.setItem('allCartList', JSON.stringify(data))
}

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('allCartList'))
}

export const useCartStore = defineStore('cart', () => {
  // 购物车列表 state
  const allCartList = ref([])
  
  // 获取最新接口购物车数据
  const getCartAPI = async () => {
    const res = await getCart()
    console.log(res.data.result)
    allCartList.value = res.data.result
  }
  // 初始化购物车数据
  const initCart = async () => {
    if (isLogin.value) {
      await getCartAPI()
      console.log(allCartList.value)
    } else {
      allCartList.value = getLocalStorage() || []
    }
  }
  initCart()
  const deleteAll = () => {
    allCartList.value = []
    setLocalStorage(allCartList.value)
  }
  // 添加商品action
  const addAllCartList = async (cartData) => {
     if (isLogin.value) {
      await addToCart({skuId: cartData.skuId, count: cartData.count})
      getCartAPI()
    } else {
      const item = allCartList.value.find(item => cartData.skuId === item.skuId)
      if (item) {
        item.count += cartData.count
      } else {
        allCartList.value.push(cartData)
      }
      setLocalStorage(allCartList.value)
    }
  }
  // 删除商品action
  const deleteProduct = async (skuId) => {
    if (isLogin.value) {
      await deleteCart(skuId)
      getCartAPI()
    } else {
      const index = allCartList.value.findIndex(item => skuId === item.skuId)
      allCartList.value.splice(index, 1)
      setLocalStorage(allCartList.value)
    }
  }
  // 检测商品selected
  const changeSelect = (skuId, selected) =>{
     const item = allCartList.value.find(item => skuId === item.skuId)
     item.selected = selected
  }
  //全选单选框
  const checkAll = computed(() => allCartList.value.every(item => item.selected))
  // 修改全部商品select
  const changeAllSelect = (selected) => {
  allCartList.value.forEach((item) => {
    item.selected = selected
  })
  }
  return { allCartList, addAllCartList, deleteProduct, changeSelect, changeAllSelect, checkAll, deleteAll, getCartAPI }
})