<template>
  <section>
    <mu-header></mu-header>
    <el-container>
      <el-main class="reg">
        <h1>用户注册</h1>
        <el-form :model="regInfo" status-icon label-position="top" class="reg-form" :rules="rules" ref="regForm">
          <el-form-item prop="userPhone">
            <el-input v-model="regInfo.userPhone" auto-complete="new-password" placeholder="请输入手机号">
              <icon slot="prefix" name="mobile-alt"></icon>
            </el-input>
          </el-form-item>
          <el-form-item prop="userPwd">
            <el-input v-model="regInfo.userPwd" type="password" auto-complete="new-password" placeholder="请输入密码">
              <icon slot="prefix" name="lock"></icon>
            </el-input>
          </el-form-item>
          <el-form-item prop="userInvite">
            <el-input v-model="regInfo.userInvite" auto-complete="new-password" placeholder="请输入邀请码">
              <icon slot="prefix" name="gift"></icon>
            </el-input>
          </el-form-item>
          <el-form-item prop="imgCode" class="reg-icon">
            <el-input v-model="regInfo.imgCode" auto-complete="new-password" placeholder="请输入验证码">
              <icon slot="prefix" name="image"></icon>
              <el-button class="btn-imgcode" slot="append" @click="createCode">{{ checkCode }}</el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="msgCode" class="reg-icon" ref="msgCodeField">
            <el-input v-model="regInfo.msgCode" auto-complete="new-password" placeholder="请输入短信验证码">
              <icon slot="prefix" name="comment-alt"></icon>
              <el-button slot="append" @click="sendMsg" class="btn-msgcode">{{ secondTxt }}</el-button>
            </el-input>
          </el-form-item>
          <el-form-item class="btn-submit">
            <el-button type="primary" @click="postReg">注册</el-button>
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
import API from '../common/api'
import qs from "qs"
export default {
  name: 'Reg',
  components: {
    MuHeader,
    MuFooter
  },
  created() {
    this.createCode()
  },
  data () {
    return {
      regInfo: {
        userPhone: '',
        userPwd: '',
        userInvite: '',
        imgCode: '',
        msgCode: ''
      },
      checkCode: '',
      second: 0,
      rules: {
        userPhone: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'change' }
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        userInvite: [
          { required: true, message: '请输入邀请码', trigger: 'change' }
        ],
        imgCode: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          { validator: this.checkImgCode, trigger: 'blur' }
        ],
        msgCode: [
          { required: true, message: '请输入短信验证码', trigger: 'change' },
          { validator: this.checkMsgCode, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    secondTxt() {
      return this.second === 0 ? '发送验证码' : '还剩' + this.second + '秒'
    }
  },
  methods: {
    // 注册
    postReg () {
      this.$refs.regForm.validate((valid) => {
        if(!valid) return false
        alert('注册成功！')
      })
    },
    // 发送短信验证码
    async sendMsg () {
      let postData = qs.stringify({
        mobile: this.regInfo.userPhone
      })
      if(this.second !== 0) return false
      let valid = await this.checkAll()
      if(valid) {
        this.$http.post(API.sendMsgCode, postData).then((data)=> {
          this.countdown(60)
        })
      }
    },
    // 图片验证码
    createCode() {
      const codeLength = 4    //验证码的长度   
      const random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',   
        'S','T','U','V','W','X','Y','Z')
      for(let i = 0; i < codeLength; i++) {
        let index = Math.floor(Math.random()*36)
        this.checkCode += random[index]
      }
    },
    // 验证码验证
    checkImgCode(rule, val, cb) {
      // if(!val) return cb(new Error('验证码不能为空'))
      if(val.toUpperCase() !== this.checkCode) return cb(new Error('请输入正确的验证码'))
      cb()
    },
    // 短信验证
    checkMsgCode(rule, val, cb) {
      let url = API.checkMsgCode + '?mobile=' + this.regInfo.userPhone + '&veriCode=' + this.regInfo.msgCode
      this.$http.get(url).then(({ data })=> {
        if(!data) return cb(new Error('请输入正确的短信验证码'))
        cb()
      })
    },
    // 全局验证
    async checkAll() {
      let $refs = this.$refs
      let result
      try {
        result = await new Promise(function(resolve, reject) {
          $refs.regForm.validate((valid, fieldObj) => {
            $refs['msgCodeField'].resetField()
            let fieldArr = Object.keys(fieldObj)
            if (valid || (fieldArr.length <= 1)) {
              resolve(true)
            } else {
              reject(false)
            }
          })
        })
      } catch (err) {
        result = err
      }
      return result
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
  }
}
</script>

<style lang="less">
.reg {
  h1 {
    font-size: 24px;
    text-align: center;
    color: #0099ff;
    margin-bottom: 80px;
  }
  .reg-form {
    margin: 0 auto;
    width: 100%;
    min-width: 320px;
    max-width: 320px;
    margin-bottom: 200px;
    .fa-icon {
      padding-left: 5px;
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
  .reg-icon span.el-input__prefix {
    line-height: 42px;
  }
  .btn-imgcode span {
    display: inline-block;
    min-width: 45px;
  }
  .btn-msgcode span {
    display: inline-block;
    min-width: 75px;
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
