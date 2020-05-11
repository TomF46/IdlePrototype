<template>
  <div class="log">
    <h3>Action Log</h3>
    <ul>
        <li v-for="(action, i) in actionLog" :key="i">{{action.dateTime}} - {{action.action}}</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Home',
  computed: {
      actionLog(){
          return this.$store.state.player.actionLog;
      }
  },
  methods:{
  }
}
</script>

<style lang="scss">

</style>