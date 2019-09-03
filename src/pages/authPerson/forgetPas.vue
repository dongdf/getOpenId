<template>
  <div>
    <div class="forgetSetp">
        <ul class="clearfix">
          <li class="leftli active"><a href=""><i>1</i><span>身份验证</span></a></li>
          <li class="leftli"><a href=""><i>2</i><span>绑定手机</span></a></li>
          <li class=""><a href=""><i>3</i><span>找回密码</span></a></li>
        </ul>
    </div>
    <div v-show="setpidx == 1">
    <div class="ptips">
      请拍摄上传<span>张三</span>的身份证
      <p>请上传该账户本人的身份证照片</p>
    </div>

      <elem configs="basicAuthPerson"></elem>
      <div class="subc">
        <button @click="gonext(2)" class="main">提交</button>
      </div>
    </div>
    <div v-show="setpidx == 2">

      <div class="yzinfo">
        <h3>请验证您的手机号</h3>
        <p>为了您的账户安全，请您协助我们完成验证</p>
      </div>


      <div class="login">

        <ul class="loginbox">
          <li><label class="loginicon"><img src="../../assets/img/login_phone.jpg"/> </label><input type="text"
                                                                                                 v-model.trim="phone"
                                                                                                 placeholder="请输入手机号"/>
          </li>
          <li><label class="loginicon"><img src="../../assets/img/login_lock.jpg"/></label><input type="text"
                                                                                               v-model.trim="phoneCode"
                                                                                               style="width:70%"
                                                                                               placeholder="请输入验证码"/>
            <div @click="getcode" class="phonecode"><span>{{timerText}}</span></div>
          </li>
          <li class="libtn">
            <button @click="gonext(3)" >确认绑定</button>

          </li>
          <!--<div class="findpas">找回密码</div>-->
        </ul>
      </div>


    </div>

    <div v-show="setpidx == 3">
          <div class="resetinfo">
            <div class="restinfocontent">
              <img src="../../assets/img/fotgetSuccess.jpg"/>
              <h3>账号找回成功</h3>
              <p>5秒后将返回登录页</p>
            </div>
            <div   class="compds">


            <li class="libtn">
              <button @click="gologin(3)" >重新登录</button>

            </li>
            </div>
          </div>

          <div class="resetinfo">
            <div class="restinfocontent">
              <img src="../../assets/img/fotgetSuccess.jpg"/>
              <h3>账号找回失败</h3>
              <p class="err"><span>手机号已注册</span></p>
            </div>
            <div   class="compds">


            <li class="libtn">
              <button @click="gonext(1)" >重新找回</button>

            </li>
            </div>
          </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "foget",
    data() {
      return {
        setpidx: 1,

        timer: 10,
        timerText: '获取验证码',
        codeSending: true,
        phone: '',
        phoneCode: ''

      }
    },
    created() {
      this.setpidx = this.$route.query.setp ? this.$route.query.setp : 1
    },
    methods: {
      gologin(){
        this.$router.push({
          path:'/mlogin'
        })
      },
      gonext(str) {
        this.$router.push({
          path: '/authPerson',
          query: {
            funCode: 'forgetPas',
            setp: str
          }
        })
      },
      getcode() {
        if (!this.$options.filters.isphone(this.phone)) {
          this.$toast('请输入正确的手机号')
          return false;
        }
        if (!this.codeSending) {
          console.log('请勿重复');
          return false;
        }
        this.codeSending = false
        this.timerText = this.timer + 'S'
        let t = setInterval(() => {
          if (this.timer == 0) {
            this.timerText = '获取验证码'
            this.codeSending = true
            this.timer = 10
            clearInterval(t)
          } else {
            this.timer--;
            this.timerText = this.timer + 'S'
          }

        }, 1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .restinfocontent{
    h3{font-size:35px; color: #FF5F2C; font-weight: normal}
    .err{
      span{
        background: #FFDDD3;
        color:#FF5F2C;
        display: inline-block;
        padding:5px 20px; border-radius: 20px;
      }
    }
  }
  .compds{
    padding:30px;
    li{
      list-style: none;
    }
  }
  .resetinfo{
    text-align: center;
  }
  .yzinfo{
    padding:50px 50px 0 50px;
    h3{
      font-size:35px;

    }
    p{color:#999;}
  }
  .subc {
    padding: 30px;
  }

  .ptips {
    text-align: center;
    padding-top: 50px;
    span {
      font-size: 30px;
      color: #FF4A02;
    }
    font-size: 30px;
    p {
      color: #999;
      font-size: 25px;
    }
  }

  .forgetSetp {
    text-align: center;
    li{
      float: left;width:35%;position:relative;background:#ffded5;padding:10px 0 10px 50px;box-sizing: border-box;
      a{color:#ff5b2d;display: block;
        i,span{display: inline-block;vertical-align: middle}
        i{width:30px;height:30px;border-radius: 50%;margin:0 8px;box-sizing: border-box;border:2px solid #ff5b2d;line-height:30px;font-size:12px}
      }
    }
    li:first-child{width:30%;}
    .active{
      background:#ff5b2d;
        a{color:#fff}
      i{background:#fff;color:#ff5b2d;border:2px solid #fff;}
    }

    .leftli:before{position: absolute;width:50px;height:100%;border-radius: 0 500px 500px 0;border-right:8px solid #fff;content:'';top:0;right:-50px;background:#ffded5;z-index:2}
    .active:before{background:#ff5b2d; }
    .setp {
      position: relative;
      width: 100%;
      background: #FFDDD3;
      text-align: center;
      padding: 15px 0;
    }
    .end {

    }
    .firt {

    }
    .ctr {
    }

    .ctr:before {
      content: '';
      position: absolute;
      height: 100%;
      width: 40px;
      top: 0;
      left: -40px;
      border-radius: 0 50% 50% 0;
      background: #FF4A02;
      /*border-right: 5px solid #FFF;*/
    }
    .ctr:after {
      content: '';
      position: absolute;
      height: 100%;
      width: 40px;
      top: 0;
      right: 0;
      border-radius: 0 50% 50% 0;
      background: #FFDDD3;
      border-right: 5px solid #FFF;
    }
    .cur {
      background: #FF4A02;
    }

  }

  .itmess {
    background: #FF4A02;
  }



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

</style>
