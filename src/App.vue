<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
export default {
  name: 'App'
}
</script>

<style lang="stylus">
body
  padding-top: 80px

.fa-icon
  width: auto
  height: 1em /* 或任意其它字体大小相对值 */
  /* 要在 Safari 中正常工作，需要再引入如下两行代码 */
  max-width: 100%
  max-height: 100%
  position: relative
  top: 1px
</style>
