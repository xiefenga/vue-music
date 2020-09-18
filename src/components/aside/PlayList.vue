<template>
  <dl class="list-item" v-if="lists.length">
    <dt class="title">{{ title }}</dt>
    <dd class="item" v-for="item in lists" :key="item.id">
      <list-item :imgSrc="item.coverImgUrl" :name="item.name" :id="item.id" />
    </dd>
  </dl>
  <dl v-else>你没有{{ title.slice(1) }}</dl>
</template>

<script>
import ListItem from './Item'
export default {
  components: {
    ListItem
  },
  props: {
    title: {
      type: String,
      default: '我创建的歌单'
    },
    lists: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.list-item {
  // margin-bottom: 20px;
  .title {
  color: #606266;
  margin-left: -10px;
  line-height: 40px;
}

.item {
  margin-top: 10px;
}
}

</style>
