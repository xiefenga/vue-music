<template>
  <div class="rec-list">
    <h2>推荐歌单</h2>
    <el-divider></el-divider>
    <div class="item-wrapper" v-loading="!lists.length">
      <list-item
        v-for="item in lists"
        :picUrl="item.picUrl"
        :playCount="item.playCount"
        :name="item.name"
        :copywriter="item.copywriter"
        :id="item.id"
        :key="item.id"
        wrapper=".recommend"
      ></list-item>
    </div>
  </div>
</template>

<script>
import ListItem from '../common/PlaylistItem'
import api from '@/api'
export default {
  components: {
    ListItem
  },
  data () {
    return {
      lists: []
    }
  },
  mounted () {
    api.getRecPlayList(180).then(res => {
      this.lists = res.result
    })
  }
}
</script>

<style lang="less" scoped>
.rec-list {
  margin-top: 10px;
  h2 {
    font-size: 24px;
    font-weight: 700;
  }
  .item-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
