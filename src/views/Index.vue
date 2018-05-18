<template>
  <div class="index">
    <h1>{{ nickName }},{{ msg }}<x-button type="primary" mini @click.native="getUserInfo">获取详细信息</x-button></h1>
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
import { mapActions, mapGetters } from 'vuex'

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
    ...mapActions([
      'userInfo'
    ]),
    getUserInfo () {
      this.userInfo()
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
</style>
