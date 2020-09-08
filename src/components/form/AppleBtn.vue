<template>
  <div class="apple-btn login-apple" :class="{ show: showBtn, right: position }">
    <li v-for="btn in appleBtn" :key="btn" :class="btn"></li>
  </div>
</template>

<script>
export default {
  name: 'AppleBtn',
  props: {
    showBtn: {
      type: Boolean,
      required: true
    },
    pos: {
      type: String,
      default: 'left'
    }
  },
  computed: {
    position () {
      return this.pos === 'right'
    }
  },
  data () {
    return {
      appleBtn: ['red-btn', 'yellow-btn', 'green-btn']
    }
  }
}
</script>

<style lang="less" scoped>
.apple-btn {
  box-sizing: border-box;
  padding: 0 2px;
  height: 25px;
  width: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &.right {
    margin-left: auto;
  }
  &.show li {
    transform: translateY(0);
    opacity: 1;
  }

  li {
    list-style: none;
    height: 15px;
    width: 15px;
    border-radius: 15px;
    transform: translateY(-120%);
    opacity: 0;
    &.red-btn {
      background-color: red;
      transition: 0.3s;
    }
    &.yellow-btn {
      background-color: orange;
      transition: 0.6s;
    }
    &.green-btn {
      background-color: #0d9a0d;
      transition: 0.9s;
    }
  }
}
</style>
