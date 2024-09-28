import { onMounted, ref } from 'vue'
import { getSubCategory } from '@/apis/category'
import { useRoute } from 'vue-router'
export function sueGetSub () {
  const route = useRoute()
  const productList = ref([])
  const reqData = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortFiled: 'publishTime' 
  })
  const tabChange = () => {
    getProductList()
  }
  const getProductList = async () => {
    const res = await getSubCategory(reqData.value)
    productList.value = res.data.result.items
  }
  onMounted(()=>{
    getProductList()
  })
  return { productList, tabChange, reqData }
}
