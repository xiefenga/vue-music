<template>
  <div class="avatar">
    <el-avatar :src="avatarSrc"></el-avatar>
    <el-dropdown v-if="true">
      <span class="el-dropdown-link">
        <span class="username">{{ username }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-user">
          <router-link to="/">个人中心</router-link>
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-more-outline">
          <router-link to="/">占位占位</router-link>
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-more-outline">
          <router-link to="/">占位占位</router-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- <div v-else> -->
      <router-link to="/login">去登录</router-link>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      avatarSrc: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '还没有登录'
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
