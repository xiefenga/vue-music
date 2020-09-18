<template>
  <div class="item-wrapper" @dblclick="playTheMusic" :class="{unable: unable, active: act}">
    <div class="eq">{{ i }}</div>
    <div class="item">
      <div class="song">
        <el-image v-if="al.picUrl" :src="al.picUrl" lazy :scroll-container="wrapper">
          <i slot="placeholder" class="el-icon-loading"></i>
        </el-image>
        <span class="name">{{ name }}</span>
      </div>
      <div class="singer">
        {{ ars }}
      </div>
      <div class="al">
        {{ al.name }}
      </div>
      <div class="time">
        {{ dt }}
      </div>
    </div>
  </div>
</template>

<script>
import { PLAY, ADD_MUSIC } from '@/store/mutation-types'
import api from '@/api'
export default {
  props: {
    wrapper: {
      type: String,
      required: true
    },
    al: {
      type: Object,
      required: true
    },
    ar: {
      type: Array,
      required: true
    },
    id: {
      type: [Number, String],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      unable: false
    }
  },
  computed: {
    ars () {
      return this.ar.join(' & ')
    },
    dt () {
      const t = Math.floor(this.duration / 1000)
      const m = Math.floor(t / 60)
      const s = String(t - m * 60).padStart(2, '0')
      return m + ':' + s
    },
    i () {
      return (this.index + 1).toString().padStart(2, '0')
    },
    act () {
      return this.id === this.$store.state.curMusic.id
    }
  },
  methods: {
    playTheMusic () {
      if (this.unable) return
      const { id, name, ar, al, duration: dt } = this
      if (!this.al.picUrl) {
        api.getMusicDetail(id).then(res => {
          const { songs: [{ al: { picUrl } }] } = res
          this.play(id, name, {
            ...al,
            picUrl
          }, ar, dt)
        })
      } else {
        this.play(id, name, al, ar, dt)
      }
    },
    play (id, name, al, ar, dt) {
      this.$store.commit(ADD_MUSIC, {
        id,
        name,
        al: {
          name: al.name,
          picUrl: al.picUrl
        },
        ar,
        dt
      })
      this.$store.commit(PLAY)
    }
  },
  mounted () {
    // api.checkMusic(this.id).then(res => {
    //   if (res.success === false) {
    //     this.unable = true
    //   }
    // }).catch(() => { this.unable = true })
  }
}
</script>

<style lang="less" scoped>
.item-wrapper {
  display: flex;
  height: 50px;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 10px;
  transition: .3s;
  align-items: center;
  user-select: none;
  &:hover {
    background-color: #e8e9ed;
  }

  &.active {
    color: #fa2800;
  }

  &.unable {
    cursor: not-allowed;
    color: gray;
  }
  .eq {
    width: 10%;
    line-height: 50px;
    text-align: center;
    flex: 0 0 auto;
  }

  .item {
    display: flex;
    align-items: center;
    flex: 1 0 auto;

    .song .name,
    .singer,
    .al,
    .time {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      box-sizing: border-box;
      padding-right: 10px;
      line-height: 40px;
    }

    .song {
      width: 440px;
      .name {
        margin-left: 10px;
        font-size: 18px;
        display: inline-block;
        width: calc(100% - 60px);
        padding: 0 10px;
      }
      .el-image {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
      }
    }
    .singer {
      width: 270px;
    }
    .al {
      width: 170px;
    }
    .time {
      width: 114px;
      text-align: center;
    }
  }
}
</style>
