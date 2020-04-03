<template>
  <div id="app">
    <div v-if="loaded">
      <idle-header></idle-header>
      <router-view/>
      <notifications group="notify" position="bottom center" />
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'app',
  components:{
    "idle-header" : Header
  },
  data: function() {
    return {
      loaded: false
    };
  },
  mounted(){
    this.$store.dispatch("loadTasks");
    this.$store.dispatch("loadPlayerData").then(res => {
      this.loaded = true;
    }).catch(err =>{
      this.$alerts.notification('error',"Unable to load player data", "Not sure how this has happened");
    });
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  margin: 0;
}
</style>
