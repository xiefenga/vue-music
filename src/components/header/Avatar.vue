<template>
  <div class="avatar" v-if="login">
    <el-avatar :src="user.avatarUrl"></el-avatar>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <span class="username">{{ user.nickname }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-user" command="personal">
          <router-link to="/">个人中心</router-link>
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-more-outline">
          <router-link to="/">占位占位</router-link>
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-switch-button" divided command="logout">
          <span>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { OFF_LINE } from '@/store/mutation-types'
import api from '@/api'
export default {
  data () {
    return {
      user: {
        avatarUrl: '',
        nickname: ''
      },
      login: false
    }
  },
  methods: {
    logout () {
      api.logout().then(data => {
        console.log(data)
      })
      window.localStorage.clear()
      this.$store.commit(OFF_LINE)
      this.$message.success('已成功退出')
      if (this.$route.name !== 'firstShow') {
        this.$router.replace('/')
      }
      window.location.reload()
    },
    handleCommand (command) {
      if (command === 'logout') {
        this.logout()
      }
    }
  },
  created () {
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    this.login = Boolean(userInfo)
    if (this.login) {
      const { nickname, avatarUrl } = userInfo
      this.user = {
        nickname,
        avatarUrl
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .avatar {
    display: flex;
    align-items: center;
    cursor: pointer;
    .username {
      font-size: 16px;
      margin: 0 5px;
    }
  }
</style>
