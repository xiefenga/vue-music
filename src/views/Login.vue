<template>
  <div class="log-wrapper">
    <login-form @login="login" @register="register" />
  </div>
</template>

<script>
import LoginForm from '@/components/form/Index'
import api from '@/api'
import { SET_UID, SET_NICKNAME, SET_AVARTAR } from '../store/mutation-types'
export default {
  components: {
    LoginForm
  },
  methods: {
    login ({ username, password }) {
      if (!username || !password) return
      // eslint-disable-next-line handle-callback-err
      api.login(username, password).then(data => {
        if (data.code === 200) {
          const { account: { id }, token, cookie, profile: { nickname, avatarUrl } } = data
          this.$store.commit(SET_UID, id)
          this.$store.commit(SET_NICKNAME, nickname)
          this.$store.commit(SET_AVARTAR, avatarUrl)
          document.cookie = cookie
          window.localStorage.setItem('token', token)
          window.localStorage.setItem('account', username)
          window.localStorage.setItem('password', password)
          window.localStorage.setItem('login', true)
          window.localStorage.setItem('uid', id)
          this.$message.success('登录成功')
          setTimeout(() => {
            this.$router.replace('/')
          }, 1500)
        } else {
          this.$message.error(data.msg)
        }
      },
      // eslint-disable-next-line handle-callback-err
      err => {
        this.$message.error('出了点问题，刷新后重试吧')
      })
    },
    register () {
      this.$notify.warning({
        title: '提示',
        message: '注册功能暂未实现'
      })
    }
  },
  mounted () {
    this.$notify.info({
      title: '提示',
      message: '注册功能暂未实现'
    })
  }
}
</script>

<style lang="less" scoped>
  .log-wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-image: linear-gradient(120deg, #487eb0, #fbc531);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
