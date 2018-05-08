<template>
  <div class="reg">
    <box gap="10px 10px">
      <img src="../assets/logo.png" alt="Logo" class="logo-img">
      <group>
        <group-title slot="title">
          <span class="logo-txt">用户注册</span>
        </group-title>
        <x-input title="手机号" v-model="regInfo.userPhone" keyboard="number" placeholder="请输入手机号" :is-type="checkUserPhone" required></x-input>
        <x-input title="密码" v-model="regInfo.userPwd" type="password" placeholder="设置密码" required></x-input>
        <x-input title="验证码" name="regImgCode" v-model="regImgCode" :max='4' :is-type="checkRegImgCode" @on-focus="createCode" required>
          <span class="check-code" slot="right">{{ checkCode }}</span>
        </x-input>
        <x-input title="短信验证码" class="weui-vcode" name="regMsgCode" v-model="regInfo.regMsgCode" :max='6' required>
          <x-button slot="right" type="primary" plain mini action-type="button" @click.native="postMsg">发送验证码</x-button>
        </x-input>
      </group>
      <div class="box">
        <x-button type="primary" @click.native="postReg">注册</x-button>
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
      regInfo: {
        userPhone: '',
        userPwd: '',
        regMsgCode: ''
      },
      regImgCode: '',
      checkCode: ''
    }
  },
  created(){
    this.createCode()
  },
  methods: {
    // 注册
    postReg () {
      console.log('regInfo=', this.regInfo)
      this.regInfo.userPhone = '15000785111'
    },
    // 发送短信验证码
    postMsg () {
      console.log('checkAll:' + this.checkAll())
    },
    // 图片验证码
    createCode() {
      this.checkCode = ""
      const codeLength = 4    //验证码的长度   
      const random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',   
        'S','T','U','V','W','X','Y','Z')
      for(let i = 0; i < codeLength; i++) {
        let index = Math.floor(Math.random()*36)
        this.checkCode += random[index]
      }
    },
    // 验证码验证
    checkRegImgCode(val = this.regImgCode) {
      return {
        valid: val && val.toUpperCase() === this.checkCode,
        msg: '请输入正确的验证码'
      }
    },
    // 手机号验证
    checkUserPhone(val = this.userPhone) {
      const patternPhone = /^1\d{10}$/
      return {
        valid: val && patternPhone.test(val),
        msg: '请输入正确的手机号'
      }
    },
    // 全局验证
    checkAll() {
      let validUserPhone = this.checkUserPhone().valid
      let validUserPwd = this.userPwd ? true : false
      let validRegImgCode = this.checkRegImgCode().valid
      console.log('validUserPhone'+validUserPhone)
      console.log('validUserPwd'+this.userPwd)
      console.log('validRegImgCode'+validRegImgCode)
      if(validUserPhone && validUserPwd && validRegImgCode) {
        return true
      }
      return false
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
  .check-code{
    border: 1px solid #44bf8b;
    padding: 3px 0px;
    width: 88px;
    background: #44bf8b;
    color: #eee;
    display: inline-block;
    text-align: center;
  }
</style>
