<template>
  <div class="login">
    <div class="loginb">
      <img src="../assets/img/loginbanner.jpg"/>
    </div>
    <ul class="loginbox">
      <li><label class="loginicon"><img src="../assets/img/login_phone.jpg"/> </label><input type="text" v-model.trim="phone" placeholder="请输入手机号"/></li>
      <li><label class="loginicon"><img src="../assets/img/login_lock.jpg"/></label><input type="text" v-model.trim="phoneCode" style="width:70%" placeholder="请输入验证码"/><div @click="getcode"  class="phonecode"><span>{{timerText}}</span></div></li>
      <li class="libtn">
        <button @click="login">用户登录</button>

      </li>
      <div @click="goforget" class="findpas">找回密码</div>
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
      goforget(){
        this.$router.push({
          path:'/authPerson',
          query:{
            funCode:'forgetPas',
            setp:1
          }
        })
      },
      login(){
        if(!this.phoneCode){
          this.$toast('请输入验证码')
          return false
        }
        this.$http.post('bind',{
          data:{
            phone:this.phone,
            code:this.phoneCode
          }
        }).then(res=>{

        })

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
        this.$http.post('sendCode',{
          data:{
            phone:this.phone
          }

        }).then(res=>{
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
        })


      }
    }
  }
</script>

<style lang="scss" scoped>
  .findpas{
    text-align: center;
    color:#999;
  }
  .loginicon{
    width:70px;
    img{width:100%;}
  }

  .login{
    .loginb{
      img{width:100%;}
    }

    .loginbox{
      padding:20px;
      background: #FFF;
      li{margin:55px 20px;
        padding:10px;
        border-bottom:1px solid #eee;
        input[type='text']{
          width: 100%;
          border:none;
        }
        display: flex;
        .phonecode{
          width:30%;
          line-height: 200%;
          span{display: block; text-align: center;color:#FF4A02}
        }

      }
      .libtn{
        border:none;
        button{
          padding:20px; border-radius: 100px;
          border:none;
          background:#FF4A02;
          color:#FFF;
          font-size:35px;
          box-shadow:0 10px 20px rgba(255,74,2,.3);
          width:100%;
        }
      }
    }
  }
</style>
