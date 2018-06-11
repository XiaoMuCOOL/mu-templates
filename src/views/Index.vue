<template>
  <section>
    <mu-header></mu-header>
    <el-container>
      <el-main class="index">
        <h1>{{ nickName }},{{ msg }}</h1>
        <el-table :data="[user]">
          <el-table-column prop="userName" label="用户名"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="nickName" label="昵称"></el-table-column>
          <el-table-column prop="vip" label="等级"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <mu-footer></mu-footer>
  </section>
</template>

<script>
import MuHeader from '../components/Header'
import MuFooter from '../components/Footer'
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  components: {
    MuHeader,
    MuFooter
  },
  data () {
    return {
      msg: '欢迎来到Vue'
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'nickName'
    ])
  }
}
</script>

<style scoped>
h1 {
  font-size: 24px;
  text-align: center;
  color: #0099ff;
  margin-bottom: 80px;
}
.index {
  padding-bottom: 400px;
}
button.logout {
  float: right;
}
</style>
