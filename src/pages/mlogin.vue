<template>
  <div class="login">

    <ul class="loginbox">
      <li><input type="text" v-model.trim="phone" placeholder="请输入手机号"/></li>
      <li><input type="text" v-model.trim="phoneCode" style="width:70%" placeholder="请输入验证码"/><div @click="getcode"  class="phonecode"><span>{{timerText}}</span></div></li>
      <li class="libtn">
        <button @click="login">用户登录</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "login",
    data(){
      return{
        timer:10,
        timerText:'获取验证码',
        codeSending:true,
        phone:'',
        phoneCode:''

      }
    },
    methods:{
      login(){

      },
      getcode(){
        if(!this.$options.filters.isphone(this.phone)){
          this.$toast('请输入正确的手机号')
          return false;
        }
        if(!this.codeSending) {
          console.log('请勿重复');
          return false;
        }
        this.codeSending = false
        this.timerText =  this.timer+'S'
        let t = setInterval(()=>{
          if(this.timer == 0){
            this.timerText = '获取验证码'
            this.codeSending = true
            this.timer = 10
            clearInterval(t)
          }else{
            this.timer--;
            this.timerText =  this.timer+'S'
          }

        },1000)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .login{
    height:200px;
    .loginbox{
      padding:20px;
      background: #FFF;
      li{margin:0 20px;
        padding:10px;
        border:1px solid #DDD;
        input[type='text']{
          width: 100%;
          border:none;
        }
        display: flex;
        .phonecode{
          width:30%;
          span{display: block; text-align: center}
        }

      }
      .libtn{
        border:none;
        button{
          padding:20px; border-radius: 20px;
          border:none;
          background: #08F;
          width:100%;
        }
      }
    }
  }
</style>
