<template>
    <div class="task">
        <p>{{task.name}}</p>
        <progress-bar ref="progressbar" :miliseconds="task.timeToComplete" @taskFinished="onTaskFinished"></progress-bar>
        <button @click="runTask">Run</button>
    </div>
</template>

<script>
import ProgressBar from './ProgressBar'

export default {
  name: 'task',
  components:{
     ProgressBar
  },
  props:{
      task: Object
  },
  methods:{
    runTask(){
        this.$refs.progressbar.start();
    },
    onTaskFinished(){
        this.$store.commit('addCurrency', this.task.payment);
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.task{
    margin: 20px 0px;
}
button{
  margin: 20px;
  padding: 10px;
  border: 1px solid black;
  background-color: #31708e;
}
</style>
