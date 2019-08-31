<template>
  <div>
    <div class="errorcontent">
      <div class="errorIcon">
        <img src="../../assets/img/successIcon.jpg"/>
      </div>

      <p>{{ttext}}</p>
    </div>
    <!--<div class="qbtn">-->
      <!--<span @click="close()">我知道了</span>-->
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: "succes-info",
    props:['ttext'],
    methods:{}
  }
</script>

<style lang="scss" scoped>
  .errorcontent{
    text-align: center;
  .errorIcon{
    width:60px;
    margin:0 auto;
  img{width:100%;}
  }
  h3{color:#fa4412}
  p{
    padding-bottom:30px;
    padding-top:20px;
  }
  }
</style>
