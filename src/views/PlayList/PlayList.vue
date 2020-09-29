<template>
  <div class="playlist" :key="id">
    <top-info
      :coverImgUrl="coverImgUrl"
      :name="name" :creator="creator"
      :createTime="createTime"
      :description="description"
      :trackCount="trackCount"
      :playCount="playCount"
      :key="id + 'top'"
      :tracks="tracks"
    />
    <playlist-content :tracks="tracks" />
    <el-backtop target=".playlist" :bottom="120"></el-backtop>
  </div>
</template>

<script>
import TopInfo from '@/components/playlist/TopInfo'
import PlaylistContent from '@/components/playlist/Content'
import api from '@/api'
export default {
  components: {
    TopInfo,
    PlaylistContent
  },
  data () {
    return {
      id: '',
      coverImgUrl: '',
      playCount: '', // 播放次数
      trackCount: '', // 歌曲数
      name: '',
      description: '', // 描述
      // tags: [], // 标签
      createTime: '', // 创建时间
      creator: {
        nickname: '',
        avatarUrl: '',
        userId: ''
      },
      tracks: []
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
            // eslint-disable-next-line no-unused-vars
            tracks, coverImgUrl, playCount, trackCount, name, description, tags, createTime
          }
        } = data
        this.coverImgUrl = coverImgUrl
        this.creator = { nickname, userId, avatarUrl }
        this.name = name
        this.description = description
        this.createTime = createTime
        this.playCount = playCount
        this.trackCount = trackCount
        // this.tags = tags
        this.tracks = []
        tracks.forEach(item => {
          const { id, name, ar: ars, al, dt } = item
          const ar = ars.map(item => item.name)
          this.tracks.push({
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
