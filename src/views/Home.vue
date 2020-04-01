<template>
  <div class="home">
    
    <task v-for="(task, i) in tasks" :key="i" :task="task"></task>
    <!-- <task :timeToComplete="100"></task> -->
  </div>
</template>

<script>
import Task from '../components/Task'

export default {
  name: 'Home',
  components:{
     Task
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
  methods:{
  }
}
</script>

<style lang="scss">

</style>