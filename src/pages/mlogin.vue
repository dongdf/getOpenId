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
      <div @click="goforget" class="findpas">找回账号</div>
    </ul>
    <div class="showxy">*登录即同意<a target="_blank" :href="xyUrl">平台服务协议</a></div>
  </div>
</template>

<script>
  import {XIEYI_URL} from '@/constants'
  export default {
    name: "login",
    data(){
      return{
        timer:60,
        timerText:'获取验证码',
        codeSending:true,
        phone:'',
        phoneCode:'',
        xyUrl:'',

      }
    },
    created(){

      this.getxieyi()
    },
    methods:{
      getxieyi(){
        this.request.post('mapi/getContractByName',{name:"优才管家平台服务协议"}).then(res=>{
          this.xyUrl = XIEYI_URL+res.data;

        })
      },
      goxieyi(){
        this.$router.push({
          path:'/authPerson',
          query:{
            funCode:'xieyi'

          }
        })
      },
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
        if(!this.phone){
          this.$toast('请输入手机号')
          return false
        }
        if(!this.$options.filters.isphone(this.phone)){
          this.$toast('请输入正确的手机号')
          return false;
        }
        if(!this.phoneCode){
          this.$toast('请输入验证码')
          return false
        }
        this.request.post('mapi/bind',{
            phone:this.phone,
            code:this.phoneCode
        }).then(res=>{
          alert(JSON.stringify(res))
          if(res.code == 0){
            localStorage.setItem('is_auth',res.is_auth)
            // debugger

            if(res.is_auth == 1){
              this.$router.push({
                path:'/authPerson',
                query:{
                  funCode:'renzheng',
                  phone:this.phone
                }
              })
            }else {

              this.request.post('mapi/getCompanyList',{}).then(res=>{
                if(res.code == 0){
                  if(res.data.length>1){
                    this.$router.push({
                      path:'/mine',
                      query:{
                        funCode:'selectCompany'
                      }
                    })
                  }else{
                    this.$router.push({
                      path:'/mine',
                      query:{
                        funCode:'minfo'
                      }
                    })
                  }



                }else{
                  this.$toast(res.msg)
                }

              })


            }



          }else{
            this.$messagebox.alert(res.msg);
            // this.$toast(res.msg)
          }

        },error=>{
          this.$messagebox.alert('登录失败！请重新登录');
          // console.log('登录失败！请重新登录')
        })

      },
      getcode(){

//        $.post({url:'https://www.lyphp.cn/mapi/sendCode',dataType: 'json',data:{token:'1212',a:{c:1,d:2},openid:'1212'}})
// return false;
        if(!this.$options.filters.isphone(this.phone)){
          this.$toast('请输入正确的手机号')
          return false;
        }
        if(!this.codeSending) {
          console.log('请勿重复');
          return false;
        }
        this.codeSending = false

        this.request.post('mapi/sendCode',{
          phone:this.phone
        }).then(info=>{


          if(info.code == 0){
            this.timerText =  this.timer+'S'
            let t = setInterval(()=>{
              if(this.timer == 0){
                this.timerText = '获取验证码'
                this.codeSending = true
                this.timer = 60
                clearInterval(t)
              }else{
                this.timer--;
                this.timerText =  this.timer+'S'
              }

            },1000)
          }else{
            this.codeSending = true
            this.$messagebox.alert(info.msg);
          }

        },error=>{
          this.codeSending = true
          alert('请求失败')
        })


      }
    }
  }
</script>

<style lang="scss" scoped>
  .showxy{

    width:100%;
    color:#666;
    left:0;
    padding-top:50px;
    text-align: center;

    a{color:#fa4412;}

  }
  .findpas{
    text-align: center;
    color:#666;
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
