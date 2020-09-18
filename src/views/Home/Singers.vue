<template>
  <div class="singers">
    <div class="filter-wrapper">
      <filter-cmp type="area" @click="getfilterW" :options="area" />
      <filter-cmp type="gender" @click="getfilterW" :options="gender" />
      <filter-cmp type="name" @click="getfilterW" :options="name" />
    </div>
    <ul class="singers-wrapper" v-infinite-scroll="getMore" v-loading="!singers.length">
      <li class="singer" v-for="item in singers" :key="item.accountId" @click="$message('歌手详情还未完成')">
        <el-image fit="cover" :src="item.picUrl" scroll-container=".singers-wrapper" lazy></el-image>
        <div class="name">{{ item.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import FilterCmp from '@/components/singers/Filter'
import api from '@/api'
export default {
  components: {
    FilterCmp
  },
  data () {
    return {
      area: [
        {
          o: '全部',
          val: -1
        },
        {
          o: '华语',
          val: 7
        },
        {
          o: '欧美',
          val: 96
        },
        {
          o: '日本',
          val: 8
        },
        {
          o: '韩国',
          val: 16
        },
        {
          o: '其他',
          val: 0
        }
      ],
      gender: [
        {
          o: '全部',
          val: -1
        },
        {
          o: '男歌手',
          val: 1
        },
        {
          o: '女歌手',
          val: 2
        },
        {
          o: '乐队',
          val: 3
        }
      ],
      name: [
        {
          o: '热门',
          val: -1
        },
        {
          o: 'A',
          val: 'a'
        },
        {
          o: 'B',
          val: 'b'
        },
        {
          o: 'C',
          val: 'c'
        },
        {
          o: 'D',
          val: 'd'
        },
        {
          o: 'E',
          val: 'e'
        },
        {
          o: 'F',
          val: 'f'
        },
        {
          o: 'G',
          val: 'g'
        },
        {
          o: 'H',
          val: 'h'
        },
        {
          o: 'I',
          val: 'i'
        },
        {
          o: 'J',
          val: 'j'
        },
        {
          o: 'K',
          val: 'k'
        },
        {
          o: 'L',
          val: 'l'
        },
        {
          o: 'M',
          val: 'm'
        },
        {
          o: 'N',
          val: 'n'
        },
        {
          o: 'O',
          val: 'o'
        },
        {
          o: 'P',
          val: 'p'
        },
        {
          o: 'Q',
          val: 'q'
        },
        {
          o: 'R',
          val: 'r'
        },
        {
          o: 'S',
          val: 's'
        },
        {
          o: 'T',
          val: 't'
        },
        {
          o: 'U',
          val: 'u'
        },
        {
          o: 'V',
          val: 'v'
        },
        {
          o: 'W',
          val: 'w'
        },
        {
          o: 'X',
          val: 'x'
        },
        {
          o: 'Y',
          val: 'y'
        },
        {
          o: 'Z',
          val: 'z'
        },
        {
          o: '其他',
          val: 0
        }
      ],
      filterW: {
        area: -1,
        gender: -1,
        name: -1
      },
      singers: [],
      offset: 0,
      hasMore: true
    }
  },
  methods: {
    getfilterW ({ type, data }) {
      this.filterW[type] = data
    },
    getMore () {
      if (!this.hasMore) {
        this.$message('到底了')
        return
      }
      const { area, gender, name } = this.filterW
      this.getSingers(area, gender, name, ++this.offset)
    },
    getSingers (area, gender, name, offset) {
      api.getSingerList(gender, area, name, offset).then(res => {
        const { artists, more } = res
        this.hasMore = more
        artists.forEach(item => {
          const { accontId, name, picUrl } = item
          this.singers.push({
            accontId,
            name,
            picUrl
          })
        })
      })
    },
    changeType () {
      this.singers = []
      this.offset = 0
      const { area, gender, name } = this.filterW
      this.getSingers(area, gender, name)
    }
  },
  mounted () {
    this.$message('该页面资源过多可能有些许卡顿')
    setTimeout(() => {
      this.getSingers()
    }, 5000)
  },
  watch: {
    'filterW.area': {
      handler () {
        this.changeType()
      }
    },
    'filterW.gender': {
      handler () {
        this.changeType()
      }
    },
    'filterW.name': {
      handler () {
        this.changeType()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.singers {
  .filter-wrapper {
    padding: 10px 0;
  }
  .singers-wrapper {
    margin-top: 20px;
    height: 400px;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    .singer {
      margin: 15px;
      width: 100px;
      height: 100px;
      text-align: center;
      cursor: pointer;
      .el-image {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
      .name {
        font-weight: 700;
        line-height: 1.5;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
