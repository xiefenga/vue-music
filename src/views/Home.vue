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
export default {
  components: {
    NavBar
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
