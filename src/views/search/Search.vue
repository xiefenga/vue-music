<template>
  <div class="search-list">
    <list-content v-loading="!tracks.length" :tracks="tracks" />
    <div class="pagination">
      <el-pagination
        v-if="pageCount - 1"
        background
        layout="prev, pager, next"
        :page-count="pageCount"
        @current-change="changePage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ListContent from '@/components/playlist/Content'
import api from '@/api'
export default {
  components: {
    ListContent
  },
  data () {
    return {
      tracks: [],
      count: 0,
      curPage: 1
    }
  },
  computed: {
    pageCount () {
      return Math.ceil(this.count / 30)
    }
  },
  methods: {
    getSearch (k) {
      this.tracks = []
      api.getSearchRes(k, this.curPage - 1).then(res => {
        const { result: { songs, songCount } } = res
        this.count = songCount
        songs.forEach(item => {
          const { id, name, artists, duration: dt, album: { name: alName } } = item
          const ar = artists.map(item => item.name)
          this.tracks.push({
            id,
            name,
            dt,
            al: {
              name: alName,
              picUrl: null
            },
            ar
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    changePage (val) {
      this.curPage = val
      this.getSearch(this.$route.query.keywords)
    }
  },
  mounted () {
    const keywords = this.$route.query.keywords
    this.getSearch(keywords)
  },
  watch: {
    '$route.query.keywords' (k) {
      this.getSearch(k)
    }
  }
}
</script>

<style lang="less" scoped>
.search-list {
  .pagination {
    position: relative;
    height: 32px;
    margin-top: 10px;
    .el-pagination {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
    }
  }
}
</style>
