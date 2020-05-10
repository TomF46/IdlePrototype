<template>
  <div class="task">
    <p>{{task.name}} -  Current level : {{taskData.level}} - Earns : {{this.paymentDisplay}} </p>
    <progress-bar
      ref="progressbar"
      :miliseconds="task.timeToComplete"
      :overrunOwed="owedTime"
      @taskFinished="onTaskFinished"
    ></progress-bar>
    <button v-if="!taskData.automated" @click="runTask">Run</button>
    <button @click="levelUp">Level up: {{levelUpCostDisplay}}</button>
    <button v-if="!taskData.automated" @click="unlockAutomation">Unlock automation: {{automationCostDisplay}}</button>
    <p v-if="taskData.automated">Task automated</p>
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
  data: function() {
    return {
        owedTime: 0
    };
  },
  computed: {
      taskData(){
          var taskData = this.getUserTaskData();
          if(taskData == null) this.$alerts.notification('error',"Unable to find level up cost", "Not sure how this has happened");
          return taskData; 
      },
      payment(){
          return this.task.defaultPayment * this.taskData.level;
      },
      paymentDisplay(){
          return this.$currenctFormatter.format(this.payment);
      },
      levelUpCostDisplay(){
        return this.$currenctFormatter.format(this.taskData.levelUpCost);
      },
      automationCostDisplay(){
        return this.$currenctFormatter.format(this.task.automationCost);
      }
  },
  mounted(){
    if(this.taskData.automated) this.runTask();
  },
  methods: {
    runTask() {
      this.$refs.progressbar.start();
    },
    onTaskFinished(overrun) {
      this.$store.commit("addCurrency", this.payment);
      this.$store.dispatch("savePlayerData");

      // If overrun is greater than the time to complete a task pay the user for those tasks until the overrun owed is less than the task time
      while(overrun > this.task.timeToComplete){
        this.$store.commit("addCurrency", this.payment);
        this.$store.dispatch("savePlayerData");
        overrun = overrun - this.task.timeToComplete; 
      }
      this.owedTime = overrun;
      if(this.taskData.automated) this.runTask();
    },
    levelUp(){
        if(this.$store.state.player.totalCurrency < this.taskData.levelUpCost){
            this.$alerts.notification('error',"Can't afford", "You can't afford this upgrade");
            return;
        }

        this.$store.commit("subtractCurrency", this.taskData.levelUpCost);
        var newTaskData = this.$store.state.player.taskData;
        var taskData = newTaskData.find(task => task.id == this.task.id);
        var index = newTaskData.indexOf(taskData);
        newTaskData[index].level++;
        newTaskData[index].levelUpCost = newTaskData[index].levelUpCost * this.$settings.costMultiplier; //Scale up cost by cost multiplier
        this.$store.commit("setPlayerTaskData", newTaskData);
        this.$store.dispatch("savePlayerData");
    },
    getUserTaskData(){
      return this.$store.state.player.taskData.find(task => task.id == this.task.id);
    },
    unlockAutomation(){
      if(this.$store.state.player.totalCurrency < this.task.automationCost){
        this.$alerts.notification('error',"Can't afford", "You can't afford automation");
        return;
      }

      this.$store.commit("subtractCurrency", this.task.automationCost);
      var newTaskData = this.$store.state.player.taskData;
      var taskData = newTaskData.find(task => task.id == this.task.id);
      var index = newTaskData.indexOf(taskData);
      newTaskData[index].automated = true;
      this.$store.commit("setPlayerTaskData", newTaskData);
      this.$store.dispatch("savePlayerData");
      this.runTask();
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
