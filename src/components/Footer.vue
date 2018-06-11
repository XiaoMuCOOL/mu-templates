<template>
  <el-container>
    <el-footer>
      <p>Copyright © 2018 · {{ projectName }} , Inc. All Rights Reserved</p>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      projectName: 'VUE'
    }
  }
}
</script>

<style scoped lang="less">
.el-container {
  justify-content: center;
}
footer {
  display: flex;
  height: 50px;
  border-top: 1px solid #0099ff;
  justify-content: center;
  p {
    width: 60%;
    min-width: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
