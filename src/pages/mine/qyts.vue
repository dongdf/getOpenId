<template>
    <div class="qytscontent">
      <img src="../../assets/img/qyts.jpg">
      <p>{{tipText}}</p>
      <div class="qbtn">
        <span @click="callback()">立即签约</span>
      </div>
    </div>
</template>

<script>
  export default {
    props:['ableClose','tipText'],
    name: "qyts",
    created(){},
    methods:{}
  }
</script>

<style lang="scss" scoped>
  .qytscontent{
    text-align: center;
    margin:0 auto;
    p{font-size:35px; padding:0px 0 20px 0;
      position: relative;
      top:-20px;
    }
    img{width:80%;}

  }
</style>
