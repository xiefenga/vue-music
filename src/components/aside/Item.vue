<template>
  <router-link :to="{ path: '/playlist', query: { id: id } }" class="list-item">
    <el-avatar shape="square" :size="50" fit="cover" :src="imgSrc"></el-avatar>
    <span class="name">{{ name | love }}</span>
  </router-link>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  filters: {
    love (value) {
      if (value.includes('喜欢的音乐')) {
        return '我喜欢的音乐'
      }
      return value
    }
  }
}
</script>

<style lang="less" scoped>
  .list-item {
    display: flex;
    align-items: flex-start;
    .name {
      margin: 10px 0 0 10px;
      display: block;
      max-width: 170px;
      font-size: 17px;
      line-height: 30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .router-link-exact-active {
    color: #fa2800;
  }
</style>
