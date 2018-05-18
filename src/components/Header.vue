<template>
  <header class="header">
    <h1>{{ appName }}</h1>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      appName: '{{ projectName }}'
    }
  }
}
</script>

<style scoped>

</style>
