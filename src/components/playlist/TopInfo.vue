<template>
  <div class="top-info" v-loading="loading">
    <el-avatar :key="coverImgUrl" class="cover-img" shape="square" :size="130" fit="fit" :src="coverImgUrl"></el-avatar>
    <span class="title">{{ name }}</span>
    <div class="creator">
      <router-link to="/">
        <el-avatar class="creator-avartar" :src="creator.avatarUrl"></el-avatar>
        <span class="creator-name">{{ creator.nickname }}</span>
      </router-link>
      <span class="create-time">{{ createdTime }} 创建</span>
    </div>
    <div class="description">
      <strong>简介：</strong>
      {{ desc || '暂无' }}
      <el-link type="primary"
        v-if="this.description && this.description.length > 30"
        @click.native="showAll"
      >
        查看全部
      </el-link>
    </div>
    <div class="count">
      <span class="track-count">歌曲数 {{ trackCount }}</span>
      <span class="play-count">播放数 {{ playCount }}</span>
    </div>
    <play-all :tracks="tracks" />
  </div>
</template>

<script>
import PlayAll from '../common/PlayAll'
export default {
  components: {
    PlayAll
  },
  props: {
    coverImgUrl: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    creator: {
      type: Object,
      required: true
    },
    createTime: {
      type: [Number, String],
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    trackCount: {
      type: [Number, String],
      required: true
    },
    playCount: {
      type: [Number, String],
      required: true
    },
    tracks: {
      type: Array,
      required: true
    }
  },
  computed: {
    createdTime () {
      const date = new Date(this.createTime)
      return `${date.getFullYear()} 年 ${date.getMonth()} 月 ${date.getDate()} 日`
    },
    desc () {
      if (this.description && this.description.length > 30) {
        return this.description.slice(0, 31) + '...'
      }
      return this.description
    },
    loading () {
      return !this.tracks.length
    }
  },
  methods: {
    showAll () {
      this.$alert(this.description, '简介', {
        showConfirmButton: false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.top-info {
  position: relative;
  padding-left: 130px;
  height: 130px;
  display: flex;
  flex-direction: column;

  .cover-img {
    position: absolute;
    left: 0;
    top: 0;
  }
  .title {
    font-size: 30px;
    font-weight: 700;
    margin-left: 20px;
  }

  .creator {
    margin: 10px 0 8px 25px;
    .creator-name{
      vertical-align: 13px;
      margin: 0 10px;
      transition: .3s;
      &:hover {
        color: #fa2800;
      }
    }
    .create-time {
      margin: 0 5px;
      font-size: 14px;
      color: #909399;
      vertical-align: 13px;
    }
  }

  .count {
    position: absolute;
    right: 10%;
    top: 10%;
    font-size: 12px;
    color: #909399;
    text-align: center;
    line-height: 1.5;

    .track-count {
      border-right: 1px solid #ddd;
    }
    .track-count,
    .play-count {
      max-width: 3em;
      display: inline-block;
      padding: 0 10px;
    }
  }

  .description {
    strong {
      font-weight: bold;
    }
    margin-left: 30px;
    line-height: 1.3;
    width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; //行数
    -webkit-box-orient: vertical;
  }
  .operate {
    position: absolute;
    right: 30px;
    bottom: 0;
  }
}
</style>
