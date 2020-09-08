<template>
  <div class="log-wrapper">
    <login-form @login="login" />
  </div>
</template>

<script>
import LoginForm from '@/components/form/Index'
import api from '@/api'
export default {
  components: {
    LoginForm
  },
  methods: {
    login ({ username, password }) {
      if (!username || !password) return
      // eslint-disable-next-line handle-callback-err
      api.login(username, password).then(data => {
        console.log(data)
      },
      // eslint-disable-next-line handle-callback-err
      err => {
        alert('网络出错了')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .log-wrapper {
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    background-image: linear-gradient(120deg, #487eb0, #fbc531);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
  }
</style>
