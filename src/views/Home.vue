<template>
  <el-container>
    <el-header>
      <nav-bar />
    </el-header>
    <el-container>
      <el-aside>aside</el-aside>
      <el-container>
        <el-main class="main">
          <transition appear mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import NavBar from '@/components/header/NavBar'
import { SET_UID, SET_NICKNAME, SET_AVARTAR } from '@/store/mutation-types'
import api from '@/api'
export default {
  components: {
    NavBar
  },
  methods: {
    detectLoginStatus () {
      const { $store: { state: { user: { uid } } } } = this
      if (!window.localStorage.getItem('account')) return
      if (uid === '') {
        api.getLoginStatus().then(data => {
          console.log(data)
          const { profile: { nickname, userId, avatarUrl } } = data
          this.$store.commit(SET_UID, userId)
          this.$store.commit(SET_NICKNAME, nickname)
          this.$store.commit(SET_AVARTAR, avatarUrl)
        // eslint-disable-next-line handle-callback-err
        }).catch(err => {
          const account = window.localStorage.getItem('account')
          const password = window.localStorage.getItem('password')
          api.login(account, password).then(data => {
            const { account: { id }, token, cookie, profile: { nickname, avatarUrl } } = data
            this.$store.commit(SET_UID, id)
            this.$store.commit(SET_NICKNAME, nickname)
            this.$store.commit(SET_AVARTAR, avatarUrl)
            document.cookie = cookie
            window.localStorage.setItem('token', token)
          })
          console.log('重新登录')
        })
      } else {
        console.log('已登录')
      }
    }
  },
  created () {
    this.detectLoginStatus()
  }
}
</script>

<style lang="less">

.main {
  overflow: hidden!important;
}

.v-enter {
  transform: translateX(100%);
}

.v-leave {
  transform: translateX(0);
}

.v-enter-active,
.v-leave-active {
  transition: .3s;
}

.v-enter-to {
  transform: translateX(0);
}

.v-leave-to {
  transform: translateX(-100%);
}
</style>
