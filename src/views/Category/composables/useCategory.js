//封装分类数据代码
import { ref, onMounted } from 'vue'
import { getCategory } from '@/apis/category.js'
import { onBeforeRouteUpdate } from 'vue-router'
export function useCategory (route) {
  const categoryData = ref({})
  const getCategoryData = async (id = route.params.id) => {
    const res = await getCategory(id)
    categoryData.value = res.data.result
    console.log(categoryData.value)
  }
  onBeforeRouteUpdate((to)=>{
    getCategoryData(to.params.id)
  })
  onMounted(()=>{
    getCategoryData()
  })
  return { categoryData  }
}
