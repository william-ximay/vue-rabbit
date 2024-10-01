import { createRouter, createWebHistory } from 'vue-router'
/* import HomeView from '../views/HomeView.vue' */
//创建路由实例
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import cartListCheck from '@/views/cartListCheck/index.vue'
import CheckOut from '@/views/CheckOut/index.vue'
import Pay from '@/views/Pay/index.vue'
const router = createRouter({
  //创建history模式路由， 还有一种哈希路由模式
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /* {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    } */
   {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: 'category/:id',
          name: 'category',
          component: Category
        },
        {
          path: 'category/sub/:id',
          name: 'subcategory',
          component: SubCategory
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: Detail
        },
        {
          path: 'cartcheck',
          name: 'cartcheck',
          component: cartListCheck
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: CheckOut
        },
        {
          path: 'pay',
          name: 'pay',
          component: Pay
        }
      ]
    },
   {
    path: '/login',
    name: 'login',
    component: Login
   }
  ],
  scrollBehavior () {
        return {
          top:0
        }
  }
})

export default router
