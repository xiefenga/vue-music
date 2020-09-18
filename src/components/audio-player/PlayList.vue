<template>
  <div class="play-list">
    <h2>播放列表</h2>
    <div class="item" :class="{active: item.id == $store.state.curMusic.id}" v-for="item in musicList" :key="item.id" @dblclick="playTheMusic(item)">
      {{ item.name }}
      <span class="singer">{{ item.ar.join(' / ') }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ADD_MUSIC, PLAY } from '@/store/mutation-types'
export default {
  computed: {
    ...mapState(['musicList'])
  },
  methods: {
    playTheMusic (item) {
      this.$store.commit(ADD_MUSIC, item)
      this.$store.commit(PLAY)
    }
  }
}
</script>

<style lang="less" scoped>
.play-list {
  position: relative;

  h2 {
    font-size: 20px;
    font-weight: 700;
    position: sticky;
    background-color: #fff;
    top: 0;
    left: 0;
    height: 40px;
    line-height: 40px;
    width: 100%;
    z-index: 1;
    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 12px;
      left: 0;
      top: -12px;
      background-color: #fff;
    }
  }
  .item {
    cursor: pointer;
    padding: 0 10px;
    padding-right: 100px;
    line-height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    font-weight: 700;
    font-size: 16px;
    &:hover {
      background-color: #e8e9ed;
    }
     &.active {
      color: #fa2800;
    }
    .singer {
      font-size: 12px;
      font-weight: 400;
      position: absolute;
      right: 0;
      top: 0;
      padding: 0 10px;
      width: 100px;
      box-sizing: border-box;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
