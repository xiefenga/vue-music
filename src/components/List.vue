<template>
  <dl>
    <dt> {{ title }} </dt>
    <dd v-for="item in optionList" :key="item">
      <item route="/">
        {{ item }}
      </item>
    </dd>
  </dl>
</template>

<script>
import Item from './Item'
export default {
  components: {
    Item
  },
  data () {
    return {
      optionList: ['个性推荐', '歌单', '排行榜', '歌手', '最新音乐'],
      title: '在线音乐'
    }
  }
}
</script>

<style lang="less" scoped>

</style>
