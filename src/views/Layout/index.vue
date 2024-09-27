<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'
import { useCategoryrStore } from '@/stores/category'
import { onMounted } from 'vue'
const { getCategory } = useCategoryrStore()
onMounted(()=>{
  getCategory()
})
</script>

<template>
  <LayoutFixed/>
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter/>
</template>
<style scoped>

</style>