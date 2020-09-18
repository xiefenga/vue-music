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
      <el-backtop target=".content" :bottom="100" :visibility-height="200"></el-backtop>
    </div>
    <audio-player></audio-player>
  </div>
</template>

<script>
import AudioPlayer from '../components/audio-player/Index'
import NavBar from '@/components/header/NavBar'
import AsideContent from '@/components/aside/Aside'
import { ON_LINE } from '@/store/mutation-types'
import { handleLoginData } from '@/util/login'
import api from '@/api'
export default {
  components: {
    NavBar,
    AsideContent,
    AudioPlayer
  },
  methods: {
    detectLoginStatus () {
      const { $store: { online } } = this
      // 未登录直接返回
      if (!window.localStorage.getItem('userInfo')) return
      if (!online) { // 已经登陆但不是跳转过来的
        // 检查登录状态是否过期
        api.getLoginStatus().then(data => {
          this.$store.commit(ON_LINE)
        // eslint-disable-next-line handle-callback-err
        }).catch(err => { // 登录状态在服务器已经过期，重新登录
          const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
          const { account, password } = userInfo
          api.login(account, password).then(data => {
            if (data.code === 200) {
              handleLoginData(data, account, password)
              this.$store.commit(ON_LINE)
            } else {
              this.$message.error(data.msg)
            }
          // eslint-disable-next-line handle-callback-err
          }).catch(err => {
            this.$message.error('出了点问题，刷新后重试吧')
          })
        })
      }
    }
  },
  created () {
    this.detectLoginStatus()
  }
}
</script>

<style lang="less" scoped>
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
    height: calc(100% - 60px - 100px);
    overflow-y: auto;
  }

  .content {
    position: absolute;
    left: 300px;
    top: 60px;
    width: calc(100% - 300px);
    height: calc(100% - 60px - 100px);
    box-sizing: border-box;
    overflow: hidden;
    padding: 20px;
    & > div:not(.el-backtop) {
      position: absolute;
      width: calc(100% - 40px);
      height: calc(100% - 40px);
      box-sizing: border-box;
      padding: 0 50px 30px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .el-backtop {
      position: fixed;
      width: 50px;
      height: 50px;
      opacity: .8;
      &:hover {
        opacity: 1;
      }
    }
  }
  .audio-player {
    position: fixed;
    width: 100%;
    bottom: 10px;
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
  transition: .5s;
}

.v-enter-to {
  transform: translateX(0);
}

.v-leave-to {
  transform: translateX(-100%);
}
</style>
