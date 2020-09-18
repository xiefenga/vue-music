<template>
    <div class="search-box">
      <el-autocomplete
        placeholder="搜索音乐"
        v-model="input"
        :fetch-suggestions="querySearchAsync"
        @focus="showHotSearch"
        @input="suggest"
        @keypress.enter.native="toSearch"
        clearable
        :popper-class="type"
      >
        <router-link
          tag="li"
          :to="{ path: '/search', query: { keywords: item.searchWord } }"
          slot-scope="{ item }"
          v-if="type === 'h'"
          class="hot"
        >
          <div class="seq" :class="{hot: item.index < 3}">{{ item.index + 1 }}</div>
          <div class="info">
            <div class="title">
              <span class="search-word">{{ item.searchWord }}</span>
            <span class="score">{{ item.score }}</span>
            <img :src="item.iconUrl" draggable="false">
            </div>
            <div class="content">
              {{ item.content }}
            </div>
          </div>
        </router-link>
        <router-link
          tag="li"
          :to="{ path: '/search', query: { keywords: item.keyword } }"
          slot-scope="{ item }"
          :title="item.keyword"
          v-else
        >
          <div class="title">{{ item.keyword }}</div>
        </router-link>
      </el-autocomplete>
      <el-button el-button icon="el-icon-search" circle @click="toSearch"></el-button>
    </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      input: '',
      suggestList: [],
      hotSearchList: [],
      type: 'h'
    }
  },
  methods: {
    querySearchAsync (queryString, cb) {
      const { type, suggestList, hotSearchList } = this
      let res = null
      queryString || (queryString = '')
      if (type === 'h') {
        res = hotSearchList.filter(item => item.searchWord.includes(queryString))
      } else if (type === 's') {
        res = suggestList
      }
      cb(res)
    },
    showHotSearch () {
      if (!this.input) {
        this.type = 'h'
      }
      if (this.hotSearchList.length) return
      api.getHotSearch().then(res => {
        const data = res.data
        data.forEach((item, index) => {
          const { searchWord, iconUrl, score, content } = item
          this.hotSearchList.push({
            index,
            searchWord,
            content,
            score,
            iconUrl
          })
        })
      })
    },
    suggest () {
      if (!this.input) return
      api.getSearchSuggestions(this.input).then(res => {
        this.suggestList = res.result.allMatch
      })
    },
    toSearch () {
      this.$router.push({ path: '/search', query: { keywords: this.input } })
    }
  },
  watch: {
    input (val) {
      if (val === '') {
        this.type = 'h'
      } else {
        this.type = 's'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .search-box {
    margin: 0 50px;
    width: 400px;
    display: flex;

    .el-autocomplete {
      width: 350px;
    }

    button {
      margin-left: 10px;
    }
  }
</style>

<style lang="less">

.el-autocomplete-suggestion {
  &.h {
    .el-scrollbar__view::before {
      content: '热搜榜';
    }
  }
  .el-scrollbar__view::before {
    content: '相关结果';
    display: block;
    font-size: 18px;
    line-height: 3;
    text-indent: 1em;
  }
  li {
    display: flex;
    height: 50px;
    .title {
      line-height: 50px;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &.hot {
      padding: 0;
    }
    .seq {
      width: 50px;
      height: 50px;
      box-sizing: border-box;
      padding: 10px;
      line-height: 30px;
      &.hot {
        color: #67C23A;
      }
    }
    .info {
      .title {
        height: 2em;
        line-height: 2;
        .search-word {
          font-weight: 700;
        }
        .score {
          color: #C0C4CC;
          font-size: 12px;
          margin: 0 10px;
        }
        img {
          height: 12px;
          vertical-align: -1px;
        }
      }
      .content {
        height: 1.5em;
        font-size: 12px;
        color: #909399;
        line-height: 1.5;
      }
    }
  }
}
</style>
