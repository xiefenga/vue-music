<template>
  <div class="playlist" :key="id">
    <top-info
      :coverImgUrl="coverImgUrl"
      :name="name" :creator="creator"
      :createTime="createTime"
      :description="description"
      :trackCount="trackCount"
      :playCount="playCount"
    />
  </div>
</template>

<script>
import TopInfo from '@/components/playlist/TopInfo'
import api from '@/api'
export default {
  components: {
    TopInfo
  },
  data () {
    return {
      id: '',
      coverImgUrl: '',
      playCount: '', // 播放次数
      trackCount: '', // 歌曲数
      name: '',
      description: '', // 描述
      tags: [], // 标签
      createTime: '', // 创建时间
      creator: {
        nickname: '',
        avatarUrl: '',
        userId: ''
      }
    }
  },
  computed: {
  },
  methods: {
    getPlaylistDetail () {
      api.getPlaylistDetail(this.id).then(data => {
        const {
          playlist: {
            creator: { nickname, userId, avatarUrl },
            tracks, trackIds, coverImgUrl, playCount, trackCount, name, description, tags, createTime
          }
        } = data
        setTimeout(() => {
          this.coverImgUrl = coverImgUrl
          this.creator = { nickname, userId, avatarUrl }
          this.name = name
          this.description = description
          this.createTime = createTime
          this.playCount = playCount
          this.trackCount = trackCount
          this.tags = tags
        }, 0)
      })
    },
    updatePlaylistInfo () {
      this.id = this.$route.query.id
      this.getPlaylistDetail()
    }
  },
  watch: {
    '$route.query.id' () {
      this.updatePlaylistInfo()
    }
  },
  mounted () {
    this.updatePlaylistInfo()
  }
}
</script>

<style lang="less" scoped>
  .playlist {
    padding: 10px 0 0 50px;
  }
</style>
