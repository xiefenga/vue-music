<template>
  <div class="daily-rec">
    <div class="top-info">
      <daily-img />
      <div class="info">
        <div class="name">每日歌曲推荐</div>
        <div class="des">
          <i class="el-icon-edit"></i>
          根据你的口味生成，每天6:00更新
        </div>
        <play-all :tracks="songs" />
      </div>
    </div>
    <playlist-content :tracks="songs" wrapper=".daily-rec" />
    <el-backtop target=".daily-rec" :bottom="120"></el-backtop>
  </div>
</template>

<script>
import PlayAll from '@/components/common/PlayAll'
import DailyImg from '@/components/recommend/DailyImg'
import PlaylistContent from '@/components/playlist/Content'
import api from '@/api'
export default {
  components: {
    DailyImg,
    PlaylistContent,
    PlayAll
  },
  data () {
    return {
      songs: []
    }
  },
  mounted () {
    api.getDailySongs().then(res => {
      const { dailySongs } = res.data
      dailySongs.forEach(item => {
        const { id, name, ar: ars, al, dt } = item
        const ar = ars.map(item => item.name)
        this.songs.push({
          id,
          name,
          al: {
            name: al.name,
            picUrl: al.picUrl
          },
          ar,
          dt
        })
      })
    })
  }
}
</script>

<style lang="less" scoped>
.daily-rec {
  .top-info {
    display: flex;
    user-select: none;
    .info {
      display: flex;
      margin-left: 20px;
      flex-direction: column;
      position: relative;
      flex: 1 0 auto;
      .name {
        font-size: 26px;
        margin-top: 20px;
        font-weight: 700;
      }
      .des {
        margin-top: 30px;
        font-size: 14px;
        color: #909399;
      }
    }
    .operate {
      position: absolute;
      right: 30px;
      bottom: 0;
    }
  }
}
</style>
