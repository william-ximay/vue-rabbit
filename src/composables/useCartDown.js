import { ref } from 'vue'
// 编辑支付倒计时
export const useCartDown = () => {
  // 1.响应式数据
  const formatTime = ref({min: 25, scd: 9})
  // 开始倒计时set
  const start = () => {
    const stop = setInterval(() => {
      formatTime.value.scd--
      if (formatTime.value.min === 0 && formatTime.value.scd === 0) {
        clearInterval(stop)
        return 
      }
      if(formatTime.value.scd === 0) {
         setTimeout(() => { 
          formatTime.value.scd = 59
          formatTime.value.min--
        },1000)
      }
    }, 1000)
  }
  return { formatTime, start }
}