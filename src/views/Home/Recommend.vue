<template>
  <div class="recommend">
    <carousel />
    <daily-rec />
    <rec-list />
    <el-backtop target=".recommend" :bottom="120"></el-backtop>
  </div>
</template>

<script>
import Carousel from '@/components/recommend/Carousel'
import RecList from '@/components/recommend/RecommendList'
import DailyRec from '@/components/recommend/DailyRec'
export default {
  components: {
    Carousel,
    RecList,
    DailyRec
  }
}
</script>
