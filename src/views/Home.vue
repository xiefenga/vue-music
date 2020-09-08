<template>
  <el-container>
    <el-header>
      <nav-bar />
    </el-header>
    <el-container>
      <el-aside>aside</el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  components: {
    NavBar
  }
}
</script>

<style lang="less">
</style>
