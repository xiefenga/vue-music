<template>
  <div class="log-wrapper">
    <login-form @login="login" @register="register" />
    <footer-info></footer-info>
  </div>
</template>

<script>
import FooterInfo from '@/components/footer/Index';
import LoginForm from '@/components/form/Index'
import { ON_LINE } from '@/store/mutation-types'
import { handleLoginData } from '@/util/login'
import api from '@/api'
export default {
  components: {
    LoginForm,
    FooterInfo
  },
  methods: {
    login ({ username, password }) {
      if (!username || !password) {
        this.$message.warning('请输入完整的手机号和密码')
        return
      }
      // eslint-disable-next-line handle-callback-err
      api.login(username, password).then(data => {
        if (data.code === 200) {
          handleLoginData(data, username, password)
          this.$store.commit(ON_LINE)
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
    footer {
      position: fixed;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
