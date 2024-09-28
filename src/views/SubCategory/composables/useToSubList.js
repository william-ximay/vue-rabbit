import { getCategorySub } from '@/apis/category'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
export function useToSubList () {
  const categoryList = ref({})
  const route = useRoute()
  const getCategoryList = async () => {
    const res = await getCategorySub(route.params.id)
    categoryList.value = res.data.result
  }
  onMounted(() => {
    getCategoryList()
  })
  return { categoryList }
}
