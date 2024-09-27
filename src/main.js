
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { getCategory } from './apis/testAPI'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

getCategory().then(res => {
  console.log(res)
})
app.mount('#app')
