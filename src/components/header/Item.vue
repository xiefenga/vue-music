<template>
  <router-link :to="route">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    route: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  a {
    display: block;
    // min-width: 50px;
    // text-align: center;
    padding: 0 10px;
  }
  .router-link-exact-active {
    position: relative;
    color: #fa2800;

    &::after {
      content: '';
      display: block;
      width:4px;
      height: 4px;
      background-color: #fa2800;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -8px;
    }
  }
</style>
