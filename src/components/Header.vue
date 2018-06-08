<template>
  <el-container direction="horizontal">
    <el-header>
      <hgroup>
        <router-link to="/" title="bingblue">
          <img src="../assets/logo.png" alt="bingblue logo">
        </router-link>
      </hgroup>
      <nav>
        <ul>
          <template v-if="!user.token">
            <li>
              <router-link to="/login"><el-button type="primary" plain size="small"><icon name="regular/user"></icon> 登录</el-button></router-link>
            </li>
            <li>
              <router-link to="/reg"><el-button type="success" plain size="small"><icon name="address-book"></icon> 注册</el-button></router-link>
            </li>
          </template>
          <template v-if="user.token">
            <li>
              欢迎，{{ nickName }}
            </li>
            <li>
              <el-button type="danger" @click="logout" class="logout">安全退出</el-button>
            </li>
          </template>
        </ul>
      </nav>
    </el-header>
  </el-container>  
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'nickName'
    ])
  },
  methods: {
    logout () {
      this.$store.commit('LOGOUT')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">
.el-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: white;
  opacity: 0.8;
}
header {
  display: flex;
  width: 60%; 
  min-width: 1000px;
  justify-content: space-between;
}
hgroup {
  width: auto;
  display: flex;
  align-items: center;
  h1 {
    margin-left: 10px;
    font-weight: 400;
  }
  img {
    order: -1;
    width: auto;
    height: 60px;
  }
}
nav {
  width: auto;
  display: flex;
  align-items: center;
  ul {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  li {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
}
</style>
