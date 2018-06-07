<template>
  <div>
    <h1>工作台</h1>
    <h2 @click="goTest">去测试页面</h2>

    <div class="test"></div>

    <h1 @click="goLogin">登录页面</h1>
  </div>
</template>
<script>
  export default {
    methods: {
      goTest() {
        window.location.href="./test.html"
      },
      goLogin() {
        window.location.href="./login.html"
      }
    }
  }
</script>
<style lang="stylus">
  .test
    width: 7.5rem
    height: 1rem
    background: green
</style>