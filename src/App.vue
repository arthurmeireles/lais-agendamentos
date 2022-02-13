<template>
        <div id="app">
            <router-view></router-view> 
        </div>
</template>




<script>

import './assets/css/style.css'

export default {
    name: 'App',
    data() {
      return {
          token: ''
      }
    },

    // mounted() {
    //   this.token = localStorage.getItem('token')
    //   if(this.token == ''){
    //       this.$router.push({name: 'login'})

    //   }
    // },
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  min-height: 100vh;
  /* margin-top: 60px; */
}
</style>
