<template>
  <div class="top-info">
    <el-avatar class="cover-img" shape="square" :size="130" fit="fit" :src="coverImgUrl"></el-avatar>
    <span class="title">{{ name }}</span>
    <div class="creator">
      <el-avatar class="creator-avartar" :src="creator.avatarUrl"></el-avatar>
      <span class="creator-name">{{ creator.nickname }}</span>
      <span class="create-time">{{ createdTime }} 创建</span>
    </div>
    <div class="description">简介：{{ description || '暂无' }}</div>
    <div class="count">
      <span class="track-count">歌曲数 {{ trackCount }}</span>
      <span class="play-count">播放数 {{ playCount }}</span>
    </div>
  </div>
</template>

<script>
export default {
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
      default: null
    },
    trackCount: {
      type: [Number, String],
      required: true
    },
    playCount: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    createdTime () {
      const date = new Date(this.createTime)
      return `${date.getFullYear()} 年 ${date.getMonth()} 月 ${date.getDate()} 日`
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
    margin: 10px 0 10px 30px;
    .creator-name,
    .create-time {
      vertical-align: 13px;
      font-size: 18px;
      margin: 0 10px;
    }
    .create-time {
      margin: 0 5px;
      font-size: 14px;
      color: #909399;
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
    margin-left: 30px;
    line-height: 1.2;
    width: 550px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; //行数
    -webkit-box-orient: vertical;
  }
}
</style>
