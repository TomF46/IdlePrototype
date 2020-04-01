<template>
    <div>
        <div class="bar-outline">
            <div class="bar-progress" :style="barStyles"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'progress-bar',
  props:{
    miliseconds: Number
  },
  data: function() {
    return {
        remainingTime: 0,
        timerIncrement: 10,
        active: false
    };
  },
  computed: {
    barStyles(){
    var timeComplete = this.miliseconds - this.remainingTime;
    var percentageComplete = (timeComplete / this.miliseconds ) * 100;

    if(this.active == false ) percentageComplete = 0;

    return {
        'width' : percentageComplete + '%'
    }
    }
  },
  methods:{
    start(){

        if(this.remainingTime > 0) return;
        this.active = true;

        this.remainingTime = this.miliseconds;
        var progressTimer = setInterval(() => {
            this.remainingTime = this.remainingTime - this.timerIncrement;
            if(this.remainingTime <= 0){
                this.onFinish();
                clearInterval(progressTimer);
            }
        },this.timerIncrement);
    },
    onFinish(){
        this.active = false;
      this.$emit("taskFinished");
    }
  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bar-outline{
    border: 1px solid #333;
    width: 60%;
    margin: 0 auto;
    height: 40px;
    box-shadow: inset 0 -1px 1px rgba(255,255,255,0.3);
}
.bar-progress{
 height: 100%;
 background-color : #31708e;
 transition: width linear;
}
</style>
