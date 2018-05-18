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
        <x-button type="primary" @click.native="postLogin">登录</x-button>
      </div>
    </box>
  </div>
</template>

<script>
import { XInput,GroupTitle,XButton,Box  } from 'vux'
import { mapActions, mapGetters } from 'vuex'

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
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'nickName'
    ])
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    // 登陆
    postLogin () {
      let postData = {
        userName: this.userPhone,
        userPwd: this.userPwd
      }
      this.login(postData).then(() => {
        this.$router.push({ name: 'Index', params: { nickName: this.nickName }})
      })
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
