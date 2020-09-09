<template>
  <div class="avatar" v-if="user.uid">
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
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  methods: {
    logout () {
      window.localStorage.clear()
      this.$message.success('已成功退出')
      window.location.reload()
    },
    handleCommand (command) {
      if (command === 'logout') {
        this.logout()
      }
    }
  },
  computed: {
    ...mapState(['user'])
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
