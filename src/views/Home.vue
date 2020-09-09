<template>
  <div class="main">
    <header>
      <nav-bar />
    </header>
    <aside>
      <aside-content />
    </aside>
    <div class="content">
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
      <footer v-if="false">footer</footer>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/header/NavBar'
import AsideContent from '../components/aside/Aside'
import { SET_UID, SET_NICKNAME, SET_AVARTAR } from '@/store/mutation-types'
import api from '@/api'
export default {
  components: {
    NavBar,
    AsideContent
  },
  methods: {
    detectLoginStatus () {
      const { $store: { state: { user: { uid } } } } = this
      if (!window.localStorage.getItem('login')) return
      if (uid === '') {
        api.getLoginStatus().then(data => {
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
        })
      }
    }
  },
  created () {
    this.detectLoginStatus()
    console.log('home create')
  }
}
</script>

<style lang="less">

.main {
  position: fixed;
  width: 100%;
  height: 100%;
  header {
    position: absolute;
    left: 0;
    top: 0;
    height: 60px;
    width: 100%;
    background-color: #EBEEF5;
  }

  aside {
    position: absolute;
    left: 0;
    top: 60px;
    width: 300px;
    height: calc(100% - 60px);
    overflow-y: auto;
  }

  .content {
    position: absolute;
    left: 300px;
    top: 60px;
    width: calc(100% - 300px);
    height: calc(100% - 60px);
    box-sizing: border-box;
    padding: 20px;
    overflow-x: hidden;
    overflow-y: auto;
    div {
      width: 100%;
      position: absolute;
    }
  }
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
