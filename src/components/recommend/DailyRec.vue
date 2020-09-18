<template>
  <div class="rec-daily">
    <h2>每日推荐</h2>
    <el-divider></el-divider>
    <div class="item">
      <daily-img @click.native="toDailyRec" />
      <div class="name">每日歌曲推荐</div>
      <div class="copywriter">根据您的音乐口味生成每日更新</div>
    </div>
  </div>
</template>

<script>
import DailyImg from './DailyImg'
export default {
  components: {
    DailyImg
  },
  methods: {
    toDailyRec () {
      this.$router.push('/daily-rec')
    }
  }
}
</script>

<style lang="less" scoped>
.rec-daily {
  margin: 10px 0 30px;
  h2 {
    font-size: 24px;
    font-weight: 700;
  }
  .item {
    width: 150px;
    overflow: hidden;
    position: relative;
    flex: 0 0 auto;
    margin: 10px 15px;
    .name {
      line-height: 2;
      text-indent: .5em;
      font-weight: 700;
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
}
</style>
