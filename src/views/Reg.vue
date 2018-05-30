<template>
  <div class="reg">
    <box gap="10px 10px">
      <img src="../assets/logo.png" alt="Logo" class="logo-img">
      <group>
        <group-title slot="title">
          <span class="logo-txt">用户注册</span>
        </group-title>
        <x-input title="手机号" v-model="regInfo.userPhone" keyboard="number" placeholder="请输入手机号" :is-type="checkUserPhone" required></x-input>
        <x-input title="密码" v-model="regInfo.userPwd" type="password" placeholder="请设置密码" required></x-input>
        <x-input title="验证码" name="imgCode" v-model="imgCode" :max='4' :is-type="checkImgCode" @on-focus="createCode" required>
          <span class="check-code" slot="right">{{ checkCode }}</span>
        </x-input>
        <x-input title="短信验证码" name="msgCode" novalidate :icon-type="msgCodeIcon" v-model="regInfo.msgCode" :debounce='100' :max='6' @on-change="checkMsgCode">
          <x-button slot="right" type="primary" plain mini action-type="button" :disabled="!checkAll()" @click.native="sendMsg">{{ secondTxt }}</x-button>
        </x-input>
      </group>
      <div class="box">
        <x-button type="primary" @click.native="postReg" :disabled="!checkAll(true)">注册</x-button>
      </div>
    </box>
  </div>
</template>

<script>
import API from '../common/api'
import qs from "qs"
export default {
  name: 'Reg',
  data () {
    return {
      regInfo: {
        userPhone: '',
        userPwd: '',
        msgCode: ''
      },
      msgCodeIcon: '',
      imgCode: '',
      checkCode: '',
      second: 0
    }
  },
  created(){
    this.createCode()
  },
  methods: {
    // 注册
    postReg () {
      alert('注册成功！')
    },
    // 发送短信验证码
    sendMsg () {
      let postData = qs.stringify({
        mobile: this.regInfo.userPhone
      })
      this.$http.post(API.sendMsgCode, postData).then((data)=> {
        this.countdown(60)
      })
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
    checkImgCode(val = this.imgCode) {
      return {
        valid: val !== '' && val.toUpperCase() === this.checkCode,
        msg: '请输入正确的验证码'
      }
    },
    // 手机号验证
    checkUserPhone(val = this.regInfo.userPhone) {
      const patternPhone = /^1\d{10}$/
      return {
        valid: val !== '' && patternPhone.test(val),
        msg: '请输入正确的手机号'
      }
    },
    // 短信验证
    checkMsgCode(val = this.regInfo.msgCode) {
      let url = API.checkMsgCode + '?mobile=' + this.regInfo.userPhone + '&veriCode=' + this.regInfo.msgCode
      let msgCode = this.$http.get(url).then(({data})=> {
        let check = this.regInfo.msgCode !== '' && data
        this.msgCodeIcon = check ? '' : 'error'
      })
    },
    // 全局验证
    checkAll(hasCheckMsgCode = false) {
      let validUserPhone = this.checkUserPhone().valid
      let validUserPwd = this.regInfo.userPwd ? true : false
      let validImgCode = this.checkImgCode().valid
      let validMsgCode = hasCheckMsgCode ? (this.regInfo.msgCode !== '' && this.msgCodeIcon !== 'error') : this.second === 0
      return validUserPhone && validUserPwd && validImgCode && validMsgCode
    },
    // 倒计时
    countdown(max) {
      this.second = max
      let time = window.setInterval(()=> {
        if(this.second <= 0) {
          this.second = 0
          window.clearInterval(time)
        }else {
          this.second--
        }
      }, 1000)
    }
  },
  computed: {
    secondTxt() {
      return this.second === 0 ? '发送验证码' : '还剩' + this.second + '秒'
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
