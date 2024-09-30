import { ElMessage } from "element-plus"
import { useUserStore } from "@/stores/user"
import router from '@/router/index.js'
//封装axios
import axios from "axios"
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})
// 添加请求拦截器
httpInstance.interceptors.request.use(function (config) {
  const userStore = useUserStore()
  const token = userStore.userData.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
httpInstance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    //统一错误提示
    ElMessage({
      type: 'warning',
      message: error.response?.data.message
    })
    //token 失效，跳转登陆页面
    if (error.response.status === 401) {
      const { clearUserData } = useUserStore()
      clearUserData()
      router.push({ name: 'login' })
    }
    return Promise.reject(error);
  });
export default httpInstance