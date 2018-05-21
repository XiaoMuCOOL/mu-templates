<template>
  <div class="index">
    <h1>{{ nickName }},{{ msg }}<x-button type="primary" mini @click.native="logout">退出</x-button></h1>
    <div style="padding:20px 15px;">
      <x-table>
        <thead>
          <tr>
            <th>关键词</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in user" :key="key">
            <td>{{ key }}</td>
            <td class="value">{{ value }}</td>
          </tr>
        </tbody>
      </x-table>
    </div>
  </div>
</template>

<script>
import { XButton, XTable } from "vux"
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  components: {
    XButton,
    XTable
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
  },
  methods: {
    logout () {
      this.$store.commit('LOGOUT')
      this.$router.push('Login')
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 30px;
  font-size: 16px;
}
.value {
  max-width: 265px;
  overflow: hidden;
}
button.weui-btn {
  margin-left: 30px;
}
</style>
