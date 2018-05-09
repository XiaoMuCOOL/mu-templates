<template>
  <div class="login">
    <box gap="10px 10px">
      <img src="../assets/logo.png" alt="Logo" class="logo-img">
      <group>
        <group-title slot="title">
          <span class="logo-txt">用户登录</span>
        </group-title>
        <x-input title="手机号" v-model="userPhone" keyboard="number" placeholder="请输入手机号" required></x-input>
        <x-input title="密码" v-model="userPwd" type="password" placeholder="请输入密码" required></x-input>
      </group>
      <div class="box">
        <x-button type="primary" @click.native="login">登录</x-button>
      </div>
    </box>
  </div>
</template>

<script>
import { XInput,GroupTitle,XButton,Box  } from 'vux'
import API from '../common/api'
import qs from "qs"
export default {
  name: 'Login',
  components: {
    XInput,
    GroupTitle,
    XButton,
    Box
  },
  data () {
    return {
      userPhone: '',
      userPwd: ''
    }
  },
  methods: {
    // 登陆
    login () {
      alert('登陆成功！')
    }
  }
}
</script>

<style scoped lang="less">
  .login {
    text-align: center;
    .logo-img {
      width: 100px;
      margin-top: 100px;
    }
    .logo-txt {
      font-size: 1.6rem;
    }
    .box {
      padding: 5%;
    }
  }
  .weui-cells__title {
    margin-bottom: 20px;
  }
</style>
