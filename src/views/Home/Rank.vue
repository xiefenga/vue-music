<template>
  <div class="rank">
    <rank-list v-loading="!list1.length" :list="list1" />
    <rank-list v-loading="!list2.length" title="全球榜" :list="list2" />
  </div>
</template>

<script>
import RankList from '@/components/rank/Index'
import api from '@/api'
export default {
  components: {
    RankList
  },
  data () {
    return {
      list1: [],
      list2: []
    }
  },
  mounted () {
    api.getToplist().then(res => {
      const { list } = res
      list.forEach(item => {
        if (item.userId === 1) {
          this.list1.push(item)
        } else {
          this.list2.push(item)
        }
      })
    })
  }
}

</script>
