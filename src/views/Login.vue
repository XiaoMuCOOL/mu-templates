<template>
  <section>
    <mu-header></mu-header>
    <el-container>
      <el-main class="login">
        <h1>用户登录</h1>
        <el-form :model="loginInfo" label-position="top" class="login-form">
          <el-form-item prop="userPhone">
            <el-input v-model="loginInfo.userPhone" auto-complete="new-password" placeholder="请输入手机号">
              <icon slot="prefix" name="mobile-alt"></icon>
            </el-input>
          </el-form-item>
          <el-form-item prop="userPwd">
            <el-input v-model="loginInfo.userPwd" type="password" auto-complete="new-password" placeholder="请输入密码">
              <icon slot="prefix" name="lock"></icon>
            </el-input>
          </el-form-item>
          <el-form-item class="btn-submit">
            <el-button type="primary" @click="postLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <mu-footer></mu-footer>
  </section>
</template>

<script>
import MuHeader from '../components/Header'
import MuFooter from '../components/Footer'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Login',
  components: {
    MuHeader,
    MuFooter
  },
  data () {
    return {
      loginInfo: {
        userPhone: '',
        userPwd: ''
      }
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
        userName: this.loginInfo.userPhone,
        userPwd: this.loginInfo.userPwd
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
  h1 {
    font-size: 24px;
    text-align: center;
    color: #0099ff;
    margin-bottom: 80px;
  }
  .login-form {
    margin: 0 auto;
    width: 100%;
    min-width: 320px;
    max-width: 320px;
    margin-bottom: 200px;
    .fa-icon {
      padding-left: 5px;
    }
  }
  .btn-submit {
    text-align: center;
    button {
      width: 100%;
      margin-top: 30px;
    }
  }
}
</style>
