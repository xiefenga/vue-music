<template>
  <div class="content" v-loading="loading">
    <div class="title">
      <div class="tiem seq">序号</div>
      <div class="item song">歌曲</div>
      <div class="item singer">歌手</div>
      <div class="item al">专辑</div>
      <div class="item time">时长</div>
    </div>

    <song-item
      v-for="(item, i) in tracks"
      :key="item.id"
      :index="i"
      :al="item.al"
      :ar="item.ar"
      :id="item.id"
      :name="item.name"
      :duration="item.dt"
      :wrapper="wrapper"
    />
  </div>
</template>

<script>
import SongItem from '../common/SongItem'
export default {
  components: {
    SongItem
  },
  props: {
    tracks: {
      type: Array,
      required: true
    },
    wrapper: {
      type: String,
      default: '.playlist'
    }
  },
  computed: {
    loading () {
      return !this.tracks.length
    }
  }
}
</script>

<style lang="less" scoped>
  .content {
    margin-top: 30px;
    .title {
      display: flex;
      align-items: center;
      height: 40px;
      background-color: rgb(223, 235, 240);
      border-radius: 10px;
      .seq {
        width: 10%;
        text-align: center;
      }
      .song {
        width: 40%;
        text-indent: 1em;
      }
      .singer {
        width: 25%;
      }
      .al {
        width: 15%;
      }
      .time {
        width: 10%;
        text-align: center;
      }
    }
  }
</style>
