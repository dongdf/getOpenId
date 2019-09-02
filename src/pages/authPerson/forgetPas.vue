<template>
  <div>
    <div class="forgetSetp">
      <div class="setp cur firt"><span>1</span>身份验证</div>
      <div class="setp ctr"><span>2</span>绑定手机</div>
      <div class="setp end"><span>2</span>找回密码</div>
    </div>
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
  .forgetSetp{
    display: flex;
    .setp{
      position: relative;
      width:100%;
      background: #FFDDD3;
      text-align: center;
      padding:15px 0;
    }
    .end{

    }
    .firt{

    }
    .ctr{
    }

    .ctr:before{
      content:'';
      position: absolute;
      height:100%;
      width:40px;
      top:0;left:-40px;
      border-radius: 0 50% 50% 0;
      background: #FF4A02;
      /*border-right: 5px solid #FFF;*/
    }
    .ctr:after{
      content:'';
      position: absolute;
      height:100%;
      width:40px;
      top:0;right:0;
      border-radius: 0 50% 50% 0;
      background: #FFDDD3;
      border-right: 5px solid #FFF;
    }
    .cur{
      background: #FF4A02;
    }

  }

</style>
