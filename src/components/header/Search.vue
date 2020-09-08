<template>
    <div class="search-box">
      <el-autocomplete
        placeholder="请输入内容"
        v-model="input"
        clearable
      >
    </el-autocomplete>
    <el-button icon="el-icon-search" circle></el-button>
    </div>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  }
}
</script>

<style lang="less" scoped>
  .search-box {
    margin: 0 50px;
    width: 300px;
    display: flex;

    button {
      margin-left: 10px;
    }
  }
</style>
