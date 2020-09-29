<template>
  <div class="latest">
    <play-all :tracks="songs" />
    <el-tabs v-model="active" @tab-click="changeArea">
      <el-tab-pane
        v-for="item in types"
        :key="item.label + item.val"
        :label="item.label"
        :name="item.val"
      >
        <latest-content v-loading="!songs.length" :tracks="songs" />
      </el-tab-pane>
    </el-tabs>
    <el-backtop target=".latest" :bottom="120"></el-backtop>
  </div>
</template>

<script>
import LatestContent from '@/components/latest/Index'
import PlayAll from '@/components/common/PlayAll'
import api from '@/api'
export default {
  components: {
    LatestContent,
    PlayAll
  },
  data () {
    return {
      prevActive: 0,
      active: 0,
      songs: [],
      types: [
        {
          label: '全部',
          val: '0'
        },
        {
          label: '华语',
          val: '7'
        },
        {
          label: '欧美',
          val: '96'
        },
        {
          label: '韩国',
          val: '8'
        },
        {
          label: '日本',
          val: '16'
        }
      ]
    }
  },
  methods: {
    changeArea (tab, event) {
      if (this.prevActive === this.active) return
      this.songs = []
      this.getData(this.active)
      this.prevActive = this.active
    },
    getData (type = 0) {
      api.getNewSongs(type).then(res => {
        const data = res.data
        data.forEach(item => {
          const { name, id, duration: dt, album: al, artists } = item
          const ar = artists.map(item => item.name)
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
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.latest {
  position: relative;
  .operate {
    position: absolute;
    right: 30px;
    top: 15px;
    z-index: 1024;
    background-color: #fff;
  }
}
</style>
