//分类轮播图代码
import { ref, onMounted } from 'vue'
import { getBanner } from '@/apis/banner.js';
export function useBanner () {
  const bannerList = ref([])
  const getBannerLsit = async () => {
    const res = await getBanner({distributionSite: '2'})
    bannerList.value = res.data.result
  }
  onMounted(()=>{
    getBannerLsit()
  })
  return { bannerList }
}

