<template>
    <div class="header">
        <div class="logo">
            <p>Idle Prototype --  Money: {{money}}</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    money(){
      return this.$store.state.player.totalCurrency
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
}
</style>
