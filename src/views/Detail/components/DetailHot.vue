<script setup>
import { onMounted, ref } from 'vue'
import { getDetailHot } from '@/apis/detail.js'
import { useRoute } from 'vue-router'
const props = defineProps({
  hotType: {
    type: Number
  }
})
const detailDataHot = ref({})
const route = useRoute()
const getDetailDataHot = async () => {
  const res = await getDetailHot({
    id: route.params.id,
    type: props.hotType,
  })
  detailDataHot.value = res.data.result
}
onMounted(()=>{
  getDetailDataHot()
})
</script>


<template>
  <div class="goods-hot">
    <h3 v-if="props.hotType === 1">周日榜单</h3>
    <h3 v-else>24小时热榜</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in detailDataHot" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{item.name}}</p>
      <p class="desc ellipsis">{{item.desc}}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  margin-bottom: 30px;
  .goods-item {
      display: block;
      width: 100%;
      padding: 20px 30px;
      text-align: center;
      transition: all .5s;

      &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
      }

      img {
        width: 160px;
        height: 160px;
      }

      p {
        padding-top: 10px;
      }

      .name {
        font-size: 16px;
      }

      .desc {
        color: #999;
        height: 29px;
      }

      .price {
        color: $priceColor;
        font-size: 20px;
      }
    }
}
</style>