import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getLogin } from '@/apis/user'
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
  //定义获取数据的异步action
  const getUserData = async ({account, password}) => {
    const res = await getLogin({account, password})
    userData.value = res.data.result
    setLocalStorage(userData.value)
  }
  // 退出时清除用户数据
  const clearUserData = () => {
    userData.value = {}
    localStorage.removeItem('userData')
  }
  return { userData, getUserData, clearUserData }
})