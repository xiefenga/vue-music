<template>
  <nav class="nav-bar">
    <div class="logo" @click="toHome">
      logo 占位
    </div>
    <item v-for="item in optionList" :key="item.title" :route="item.route">
      {{ item.title }}
    </item>
    <search-box />
    <avatar />
  </nav>
</template>

<script>
import Item from './Item'
import SearchBox from './Search'
import Avatar from './Avatar'
export default {
  components: {
    Item,
    SearchBox,
    Avatar
  },
  data () {
    return {
      optionList: [
        {
          title: '个性推荐',
          route: '/recommend'
        }, {
          title: '歌单',
          route: '/song-list'
        },
        {
          title: '排行榜',
          route: '/rank'
        },
        {
          title: '歌手',
          route: '/singers'
        },
        {
          title: '最新音乐',
          route: '/latest-music'
        }
      ]
    }
  },
  methods: {
    toHome () {
      const { $route, $router } = this
      if ($route.name === 'firstShow') return
      $router.push({ name: 'firstShow' })
    }
  }
}
</script>

<style lang="less" scoped>

.nav-bar {
  height: 100%;
  display: flex;
  align-items: center;
  width: 1380px;
  margin: 0 auto;

  .logo {
    cursor: pointer;
    width: 200px;
    margin-right: 20px;
    box-sizing: border-box;
    text-align: center;
  }
}
</style>
