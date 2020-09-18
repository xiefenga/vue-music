<template>
  <footer>
    <span>© {{ year }} 谢峰 </span> |
    <a href="https://beian.miit.gov.cn">苏ICP备2020051656号</a>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      year: null
    }
  },
  mounted () {
    this.year = new Date().getFullYear()
  }
}
</script>

<style lang="less" scoped>
footer {
  padding: 5px;
  color: rgba(255,255,255,.6);
  border-radius: 10px;
  text-shadow: 0 0 20px rgba(0,0,0,.8);
  border: 1px solid
}
</style>
