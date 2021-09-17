<template>
  <div id="app">
    <!-- <datav /> -->
    <router-view></router-view>
  </div>

</template>

<script>
import datav from './components/datav/index.vue'
export default {
  name: 'app',
  components: {
    datav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
    width: 100%;
  height: 100%;
  margin-top: 60px;
}
</style>
