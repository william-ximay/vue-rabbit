import { onMounted, ref } from 'vue'
import { getSubCategory } from '@/apis/category'
import { useRoute } from 'vue-router'
export function useGetSub () {
  const route = useRoute()
  const productList = ref([])
  const disabled = ref (false)
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
  const load = async () => {
  reqData.value.page++
  const res = await getSubCategory(reqData.value)
  productList.value = [...productList.value, ...res.data.result.items]
  //加载完毕停止监听
  if(res.data.result.items.length === 0) {
    console.log('底部')
    disabled.value = true
  }
  }
  onMounted(()=>{
    getProductList()
  })
  return { productList, tabChange, reqData, load, disabled }
}
