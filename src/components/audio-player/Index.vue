<template>
  <div class="audio-player">
    <audio :src="musicUrl"></audio>
    <div class="cover-img">
      <el-avatar shape="square" :size="80" :src="avatarUrl"></el-avatar>
    </div>
    <div class="info">
      <div class="title">{{ title || '暂无' }}</div>
      <div class="singer">{{ singer || '暂无' }}</div>
    </div>
    <div class="controls">
      <el-button icon="el-icon-back" circle @click="nextMusic(-1)"></el-button>
      <el-button
        icon="el-icon-video-play"
        circle
        v-if="!playing"
        @click="handlerClick"
      ></el-button>
      <el-button
        icon="el-icon-video-pause"
        circle
        v-else
        @click="handlerClick"
      ></el-button>
      <el-button icon="el-icon-right" circle @click="nextMusic(1)"></el-button>
      <div class="time">
        <div class="cur-time">{{ curTime }}</div>
        <div class="slider">
          <el-slider
            v-model="t"
            :show-tooltip="false"
            @change="changeTime"
          ></el-slider>
        </div>
        <div class="total-time">{{ totalTime }}</div>
      </div>
      <div class="volume">
        <i
          :class="{
            'el-icon-bell': !isMuted,
            'el-icon-close-notification': isMuted
          }"
          @click="muted"
        ></i>
        <div class="slider">
          <el-slider v-model="volume"></el-slider>
        </div>
      </div>
      <div class="icons">
        <div class="item" @click="changeMode">
          <i :class="{'el-icon-refresh-right': mode == 1, 'el-icon-sort': mode == 0, 'el-icon-finished': mode == 2}"></i>
        </div>
        <el-popover class="item" placement="top" trigger="click" width="350">
          <lyric :lyric="lyric" :curTime="cur" />
          <i
            slot="reference"
            class="el-icon-notebook-2"
            @click="getLyric"
          ></i>
        </el-popover>
        <el-popover class="item" placement="top" trigger="click" width="350">
          <play-list />
          <i slot="reference" class="el-icon-s-operation"></i>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import Lyric from './Lyric'
import PlayList from './PlayList'
import { PLAY, PAUSE, NEXT_MUSIC, PUT_TRACKS, SET_INDEX, CHANGEMODE } from '@/store/mutation-types'
import { mapState } from 'vuex'
import api from '@/api'
export default {
  name: 'AudioPlayer',
  components: {
    PlayList,
    Lyric
  },
  data () {
    return {
      title: '',
      singer: '',
      musicUrl: '',
      avatarUrl: '',
      isMuted: false,
      volume: 50,
      t: 0,
      timer: null,
      audio: null,
      total: 0,
      cur: 0,
      tmpVolum: 0,
      id: '',
      lyric: ''
    }
  },
  computed: {
    totalTime () {
      return Math.floor(this.total / 60) + ':' + (this.total % 60 / 100).toFixed(2).slice(-2)
    },
    curTime () {
      return Math.floor(this.cur / 60) + ':' + (this.cur % 60 / 100).toFixed(2).slice(-2)
    },
    ...mapState(['playing', 'mode'])
  },
  methods: {
    changeMode () {
      this.$store.commit(CHANGEMODE)
    },
    getLyric () {
      if (this.lyric) return
      api.getLyric(this.id).then(res => { this.lyric = res.lrc.lyric })
      // .then(() => console.log(this.lyric))
    },
    muted () {
      if (!this.isMuted) {
        this.tmpVolum = this.volume
        this.volume = 0
        this.isMuted = true
      } else {
        this.volume = this.tmpVolum
        this.isMuted = false
      }
    },
    nextMusic (offset) {
      this.$store.commit(NEXT_MUSIC, offset)
    },
    handlerClick () {
      const { playing, musicList } = this.$store.state
      if (musicList.length === 0) return
      if (playing) {
        this.pause()
      } else {
        this.play()
      }
    },
    changeTime (val) {
      this.audio.currentTime = val * 0.01 * this.total
    },
    play () {
      this.audio.play()
      this.$store.commit(PLAY)
    },
    pause () {
      this.audio.pause()
      this.$store.commit(PAUSE)
    },
    initPlayer (id) {
      this.id = id
      api.getMusicUrl(id).then(data => {
        const url = data.data[0].url
        this.musicUrl = url
        this.audio.currentTime = 0
        if (url == null) {
          this.pause()
          this.$message.error('这首歌曲网易云暂时无法播放')
        }
      })
      this.audio.oncanplay = () => {
        this.total = this.audio.duration
        this.cur = this.audio.currentTime
        this.audio.volume = this.volume / 100
        if (this.$store.state.playing) {
          this.play()
        }
      }
      this.audio.onplay = () => {
        if (this.timer) return
        this.timer = setInterval(() => {
          this.cur = this.audio.currentTime
          this.t = (this.cur / this.total) * 100
        }, 1000)
      }
      this.audio.onended = () => {
        this.$store.commit(NEXT_MUSIC)
      }
    }
  },
  watch: {
    volume (val) {
      this.audio.volume = val / 100
      window.localStorage.setItem('volume', val)
      if (this.volume !== 0) {
        this.isMuted = false
      } else {
        this.isMuted = true
      }
    },
    '$store.state.curMusic' (info) {
      const { id, name, al, ar } = info
      this.initPlayer(id)
      this.title = name
      this.singer = ar.join(' / ')
      this.avatarUrl = al.picUrl
      api.getLyric(this.id).then(res => { this.lyric = res.lrc.lyric }).then(() => console.log(this.lyric))
    }
  },
  mounted () {
    this.audio = document.querySelector('audio')
    const volume = window.localStorage.getItem('volume')
    volume && (this.volume = +volume)
    const musicList = JSON.parse(window.localStorage.getItem('musicList'))
    const index = +window.localStorage.getItem('musicIndex')
    if (musicList) {
      this.$store.commit(PUT_TRACKS, musicList)
      this.$store.commit(SET_INDEX, index)
    }
  }
}
</script>

<style lang="less" scoped>
.audio-player {
  height: 100px;
  border-radius: 20px;
  display: flex;
  background-color: #eee;
  user-select: none;

  .cover-img,
  .controls,
  .info {
    display: flex;
    align-items: center;
    margin: 0 20px;
  }

  .info {
    width: 150px;
    padding: 10px;
    margin: 0;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    .title,
    .singer {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .title {
      font-size: 20px;
      margin: 10px 0;
      line-height: 25px;
    }
    .singer {
      font-size: 14px;
      color: #909399;
      line-height: 18px;
    }
  }

  .controls {
    flex: 1 0 auto;
    i {
      outline: none;
      font-size: 24px;
      cursor: pointer;
      &:hover {
        color: #5cb6ff;
      }
    }
    .time {
      margin: 0 20px;
      width: 600px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .cur-time,
      .total-time {
        width: 50px;
      }
      .slider {
        width: 390px;
        margin: 0 20px;
        flex: 1 0 auto;
      }
    }

    .volume {
      width: 200px;
      display: flex;
      align-items: center;
      .slider {
        margin: 0 20px;
        flex: 1 0 auto;
      }
    }

    .icons {
      display: flex;
      align-items: center;
      margin: 0 15px 0 auto;
      .item {
        margin: 0 15px;
      }
    }
  }

  .el-button {
    font-size: 25px;
  }
}
</style>

<style lang="less">
.el-popper {
  max-height: 500px;
  overflow-y: scroll;
}
</style>
