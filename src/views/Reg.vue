<template>
  <div class="reg">
    <box gap="10px 10px">
      <img src="../assets/logo.png" alt="Logo" class="logo-img">
      <group>
        <group-title slot="title">
          <span class="logo-txt">用户注册</span>
        </group-title>
        <x-input title="手机号" name="userPhone" keyboard="number" placeholder="请输入手机号" is-type="china-mobile" require></x-input>
        <x-input title="密码" name="userPwd" type="password" placeholder="设置密码" require></x-input>
        <x-input title="验证码">
          <img slot="right-full-height" src="https://ws1.sinaimg.cn/large/663d3650gy1fq684go3glj203m01hmwy.jpg">
        </x-input>
        <x-input title="发送验证码" class="weui-vcode">
          <x-button slot="right" type="primary" plain mini action-type="button">发送验证码</x-button>
        </x-input>
      </group>
      <div class="box">
        <x-button type="primary">注册</x-button>
      </div>
    </box>
  </div>
</template>

<script>
import { XInput,GroupTitle,XButton,Box  } from 'vux'
export default {
  name: 'Reg',
  components: {
    XInput,
    GroupTitle,
    XButton,
    Box
  },
  data () {
    return {
      src: 'LogoSrc'
    }
  }
}
</script>

<style scoped lang="less">
  .reg {
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
</style>
