<template>
  <div>
    <div class="ptips">
      请拍摄上传<span>张三</span>的身份证
      <p>请上传该账户本人的身份证照片</p>
    </div>
    <elem configs="basicAuthPerson"></elem>
    <div class="subc">
      <button class="main">提交</button>
    </div>
  </div>
</template>

<script>

  // import authperson from './basicAuthPerson'
  export default {
    name: "renzheng",
    data(){
      return{

      }
    },
    mounted(){


    },
    // components:{authperson},
    methods:{}
  }
</script>

<style lang="scss" scoped>
  .subc{
    padding:30px;
  }
  .ptips{
    text-align: center;
    padding-top:50px;
    span{font-size:30px; color: #FF4A02;}
    font-size:30px;
    p{color:#999;font-size:25px;}
  }

</style>
