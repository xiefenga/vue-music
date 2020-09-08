<template>
  <div class="form-container">
    <transition>
      <login
        v-if="type == 'login'"
        @change="handelChange"
        key="login"
        @submit="transData"
        textPlaceholder="请输入手机号"
      />
      <login
        v-else
        @change="handelChange"
        type="sign-box"
        changeText="去登录"
        key="sign"
        title="Sign"
        @submit="transData"
      />
    </transition>
  </div>
</template>

<script>
import Login from './Login'
export default {
  name: 'LogForm',
  data () {
    return {
      showLog: true,
      type: 'login'
    }
  },
  components: {
    Login
  },
  methods: {
    handelChange (type) {
      if (type === 'login') {
        this.type = 'sign'
      } else {
        this.type = 'login'
      }
    },
    transData (data) {
      if (this.type === 'login') {
        this.$emit('login', data)
      } else {
        this.$emit('register', data)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.form-container {
  position: relative;
  height: 350px;
  width: 600px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(17, 39, 59, 0.8);
  overflow: hidden;
}

.v-enter {
  transform: rotate(90deg);
}

.v-leave {
  transform: rotate(0deg);
}

.v-enter-active,
.v-leave-active {
  transition: 0.5s ease-in-out;
}

.v-enter-to {
  transform: rotate(0deg);
}

.v-leave-to {
  transform: rotate(-90deg);
}
</style>
