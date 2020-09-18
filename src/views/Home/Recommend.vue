<template>
  <div class="recommend">
    <carousel />
    <daily-rec />
    <rec-list />
  </div>
</template>

<script>
// import api from '@/api'
import Carousel from '@/components/recommend/Carousel'
import RecList from '@/components/recommend/RecommendList'
import DailyRec from '@/components/recommend/DailyRec'
export default {
  components: {
    Carousel,
    RecList,
    DailyRec
  },
  data () {
    return {
    }
  },
  created () {
  }
}
</script>
