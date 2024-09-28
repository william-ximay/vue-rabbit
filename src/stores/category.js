/* eslint-disable no-debugger */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout.js'
export const useCategoryrStore = defineStore('category', () => {
 
  const categoryList = ref([])
  
  const getCategory = async () => {
    const res = await getCategoryAPI()
    console.log('warn')
    categoryList.value = res.data.result
    console.log(categoryList.value)
  }
  return { categoryList, getCategory }
})
