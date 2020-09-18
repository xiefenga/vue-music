<template>
  <div class="list">
    <list-item
      v-for="(item, i) in tracks"
      :key="item.id"
      :index="i"
      :al="item.al"
      :ar="item.ar"
      :id="item.id"
      :name="item.name"
      :duration="item.dt"
      wrapper=".latest"
    />
  </div>
</template>

<script>
import ListItem from '../common/SongItem'
export default {
  components: {
    ListItem
  },
  props: {
    tracks: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  min-height: 100px;
}
</style>
