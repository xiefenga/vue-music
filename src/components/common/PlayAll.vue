<template>
  <div class="operate">
    <el-button round size="small" type="success" @click="playAll">
      <i class="el-icon-video-play"></i>
      播放全部
    </el-button>
    <el-button round size="small" @click="$message('该功能暂未实现')">
      <i class="el-icon-star-off"></i>
      收藏
    </el-button>
  </div>
</template>

<script>
import { PLAY, PUT_TRACKS } from '@/store/mutation-types'
export default {
  props: {
    tracks: {
      type: Array,
      required: true
    }
  },
  methods: {
    playAll () {
      this.$store.commit(PUT_TRACKS, this.tracks)
      this.$store.commit(PLAY)
    }
  }
}
</script>
