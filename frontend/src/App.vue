<!--App.vue-->
<template>
  <div id="app">
    <!-- <HomePage /> -->
    <router-view></router-view>
  </div>

</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import HomePage from './pages/HomePage.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld
    // HomePage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
</style>
