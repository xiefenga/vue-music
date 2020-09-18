<template>
  <div class="rank-list">
    <h2>{{ title }}</h2>
    <el-divider></el-divider>
    <div class="item-wrapper">
      <rank-item
        v-for="item in list"
        :picUrl="item.coverImgUrl"
        :playCount="item.playCount"
        :name="item.name"
        :id="item.id"
        :key="item.id"
        wrapper=".rank"
      ></rank-item>
    </div>
  </div>
</template>

<script>
import RankItem from '../common/PlaylistItem'
export default {
  components: {
    RankItem
  },
  props: {
    title: {
      type: String,
      default: '官方榜'
    },
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  .rank-list {
    h2 {
      font-size: 20px;
      font-weight: 700;
      margin-top: 10px;
    }
    .item-wrapper {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
  }
</style>
