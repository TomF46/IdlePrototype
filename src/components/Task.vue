<template>
  <div class="task">
    <p>{{task.name}} -  Current level : {{currentLevel}} - Earns : {{this.paymentDisplay}} </p>
    <progress-bar
      ref="progressbar"
      :miliseconds="task.timeToComplete"
      @taskFinished="onTaskFinished"
    ></progress-bar>
    <button @click="runTask">Run</button>
    <button @click="levelUp">Level up: {{levelUpCostDisplay}}</button>
  </div>
</template>

<script>
import ProgressBar from "./ProgressBar";

export default {
  name: "task",
  components: {
    ProgressBar
  },
  props: {
    task: Object
  },
  computed: {
      currentLevel(){
          var taskData = this.$store.state.player.taskData.find(task => task.id == this.task.id);
          if(taskData == null) return 1;
          return taskData.level;
      },
      levelUpCost(){
          var taskData = this.$store.state.player.taskData.find(task => task.id == this.task.id);
          if(taskData == null) throw "something has gone wrong, alert this one day";
          return taskData.levelUpCost;
      },
      payment(){
          return this.task.defaultPayment * this.currentLevel;
      },
      paymentDisplay(){
          return this.$currenctFormatter.format(this.payment);
      },
      levelUpCostDisplay(){
        return this.$currenctFormatter.format(this.levelUpCost);
      }
  },
  methods: {
    runTask() {
      this.$refs.progressbar.start();
    },
    onTaskFinished() {
      this.$store.commit("addCurrency", this.payment);
      this.$store.dispatch("savePlayerData");
    },
    levelUp(){
        if(this.$store.state.player.totalCurrency < this.levelUpCost){
            alert("Cant afford");
            return;
        }

        this.$store.commit("subtractCurrency", this.levelUpCost);
        var newTaskData = this.$store.state.player.taskData;
        var taskData = newTaskData.find(task => task.id == this.task.id);
        var index = newTaskData.indexOf(taskData);
        newTaskData[index].level++;
        newTaskData[index].levelUpCost = newTaskData[index].levelUpCost * 1.15; //Scale up cost by 1.15 times
        this.$store.commit("setPlayerTaskData", newTaskData);
        this.$store.dispatch("savePlayerData");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.task {
  margin: 20px 0px;
}
button {
  margin: 20px;
  padding: 10px;
  border: 1px solid black;
  background-color: #31708e;
}
</style>
