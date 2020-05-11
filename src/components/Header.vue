<template>
    <div class="header">
        <div class="logo">
            <p>Idle Prototype --  Money: {{money}} <button class="reset-button" @click="confirmReset">Reset</button></p>
            <ul class="links-list">
              <li @click="navigate('/')">Tasks</li>
              <li @click="navigate('/log')">Log</li>
            </ul>
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
    navigate(link){
      this.$router.push(link);
    },
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
    position: relative;

    p{
        font-size: 26px;
        padding: 20px;
        padding-bottom: 0;
        margin: 0;
    }

    .reset-button{
      position: absolute;
      top: 20px;
      right: 20px;
      padding: 10px;
      border: 1px solid #eee;
      background-color: #9B1003;
      color: #eee;
    }

    .links-list{
      margin-top: 0;
      li{
        text-decoration: underline;
        display: inline;
        padding: 10px;
        cursor: pointer;
      }
    }
}
</style>
