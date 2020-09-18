<template>
  <div class="item" @click="toPlayList" :title="name">
    <div class="item-image">
      <el-image :src="picUrl" lazy :scroll-container="wrapper">
        <i slot="placeholder" class="el-icon-loading"></i>
      </el-image>
    </div>
    <div class="play-count" v-if="playCount">
      <i class="el-icon-headset"></i>
       {{ playCount | toMillion }}
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div class="copywriter" v-if="copywriter">
      {{ copywriter }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    wrapper: {
      type: String,
      required: true
    },
    picUrl: {
      type: String
    },
    id: {
      type: Number
    },
    playCount: {
      type: Number
    },
    copywriter: {
      type: String
    },
    name: {
      type: String
    }
  },
  methods: {
    toPlayList () {
      this.$router.push({ path: '/playlist', query: { id: this.id } })
    }
  },
  filters: {
    toMillion (val) {
      if (val > 10000) {
        return Math.floor(val / 1000) + '万'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  width: 150px;
  overflow: hidden;
  position: relative;
  flex: 0 0 auto;
  margin: 10px 15px;
  .item-image {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    box-sizing: border-box;
    .el-image {
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 150px;
    }
  }
  .play-count {
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px;
    font-size: 12px;
    border-radius: 10px;
    user-select: none;
    color: #fff;
    background-color: rgba(0, 0, 0, .1);
  }
  .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5;
  }
  .copywriter {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    box-sizing: border-box;
    padding: 5px;
    box-shadow: inset 20px 20px 50px rgb(128, 128, 128);
    transition: .4s;
    transform: translateY(-105%);
    border-radius: 10px;
    color: #fff;
    font-size: 14px;
    line-height: 1.2;
  }
  &:hover {
    .copywriter {
      transform: translateY(0);
    }
  }
}
</style>
