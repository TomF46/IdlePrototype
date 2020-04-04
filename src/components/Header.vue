<template>
    <div class="header">
        <div class="logo">
            <p>Idle Prototype --  Money: {{money}} <button class="reset-button" @click="confirmReset">Reset</button></p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    money(){
      return this.$currenctFormatter.format(this.$store.state.player.totalCurrency);
    }
  },
  methods:{
    confirmReset(){
      var consent = confirm("Are you sure you want to reset all progression?")
      if(consent) this.reset();
    },
    reset(){
      this.$store.dispatch("resetData");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header{
    background-color: #31708e;
    box-shadow: 0 4px 2px -2px #0c3b5b;
    margin: 0;

    p{
        font-size: 26px;
        padding: 20px;
        margin: 0;
    }

    .reset-button{
      margin: 20px;
      padding: 10px;
      border: 1px solid #eee;
      background-color: #9B1003;
      color: #eee;
    }
}
</style>
