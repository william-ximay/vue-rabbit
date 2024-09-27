<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'
import { useCategoryrStore } from '@/stores/category'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
const { getCategory } = useCategoryrStore()
const {  categoryList } = storeToRefs(useCategoryrStore())
onMounted(()=>{
  getCategory()
})
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader :categoryList="categoryList"/>
  <RouterView />
  <LayoutFooter/>
</template>
<style scoped>

</style>