<template>
  <div class="aside" :class="{'no-login': !loginStatus}">
    <div class="to-login" v-if="!loginStatus">
      还没有登录，
      <router-link to="/login">
       <el-link type="primary">去登录</el-link>
       <i class="el-icon-s-promotion"></i>
      </router-link>
    </div>
    <div class="play-list" v-else>
      <play-list :lists="createdList" />
      <el-divider></el-divider>
      <play-list title="我收藏的歌单" :lists="collectedList" />
    </div>
  </div>
</template>

<script>
import PlayList from './PlayList'
import api from '@/api';
export default {
  components: {
    PlayList
  },
  computed: {
    loginStatus () {
      return Boolean(window.localStorage.getItem('login'))
    }
  },
  created () {
    // const { $store: { state: { user: { uid } } } } = this
    const uid = window.localStorage.getItem('uid')
    if (uid == null) return
    api.getPlaylists(uid).then(data => {
      data.playlist.forEach(item => {
        const { userId, coverImgUrl, id, name } = item
        // eslint-disable-next-line eqeqeq
        if (userId == uid) {
          this.createdList.push({
            coverImgUrl,
            name,
            id
          })
        } else {
          this.collectedList.push({
            coverImgUrl,
            name,
            id
          })
        }
      })
    })
  },
  data () {
    return {
      createdList: [],
      collectedList: []
    }
  }
}
</script>

<style lang="less" scoped>
  .aside {
    min-height: 100%;
    box-sizing: border-box;
    padding: 20px;
    background-color: #F2F6FC;

    &.no-login {
      background-color: #F2F6FC;
    }

    .to-login {
      text-align: center;
      transform: translateY(300px);
    }
  }
</style>
