<template>
  <div>
    <div class="errorcontent">
      <div class="errorIcon">
        <img src="../../assets/img/errorIcon.jpg"/>
      </div>
      <h3>{{errs.title?errs.title:'错误'}}</h3>
      <p>{{errs.desc?errs.desc:'未知提示'}}</p>
    </div>
    <div class="qbtn">
      <span @click="close()">我知道了</span>
    </div>
  </div>

</template>

<script>
  export default {
    name: "error-info",
    props:['errs'],
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
      padding-bottom:40px;
      padding-top:20px;
    }
  }
</style>
