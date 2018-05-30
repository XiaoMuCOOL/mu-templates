<template>
  <div class="index">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
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
