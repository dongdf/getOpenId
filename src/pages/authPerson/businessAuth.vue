<template>
  <div>
    <div class="forgetSetp breakfour">
      <ul class="clearfix">
        <li class="leftli active"><a href=""><i>1</i><span>上传截图</span></a></li>
        <li class="leftli active"><a href=""><i>2</i><span>完善信息</span></a></li>
        <li class="leftli active"><a href=""><i>3</i><span>确认信息</span></a></li>
        <li class="active"><a href=""><i>4</i><span>签约合同</span></a></li>

      </ul>
    </div>
    <div v-show="setpidx == 1">
      <div class="aucontent">
        <ul>

          <li v-if="upimgzm.length>0">
            <img src="../../assets/img/uploadDemo.png"/>
            <span class="delicon" @click="delimgzm()">删除</span></li>
          <li v-else><img src="../../assets/img/bsiup.jpg"/><wxupload @upinfo="upinfozm"></wxupload></li>



        </ul>
        <div class="auDemo">
          <img src="../../assets/img/authDemo.jpg"/>
        </div>
      </div>


      <div class="subc">
        <button @click="gonext(2)" class="main">下一步</button>
      </div>
    </div>

    <div v-show="setpidx == 2">
      <div class="busContent">
        <ul>

          <li class="fileTitle">基本信息</li>
          <li>
            <div class="filelabel">姓名</div>
            <div class="filecontent" style="color:#999">张三</div>
          </li>
          <li>
            <div class="filelabel">性别</div>
            <div class="filecontent">男</div>
          </li>
          <li>
            <div class="filelabel">身份证</div>
            <div class="filecontent">1305291988***&*3733</div>
          </li>
          <li>
            <div class="filelabel">生日</div>
            <div class="filecontent">1994-09-28</div>
          </li>
          <li>
            <div class="filelabel">户籍所在地</div>
            <div class="filecontent">河北省石家庄市</div>
          </li>
          <li>
            <div class="filelabel">身份证</div>
            <div class="filecontent" style="color:#00B12E">已上传></div>
          </li>

          <li class="fileTitle">其它信息</li>

          <li>
            <div class="filelabel" style="color:#FF4A02">手机号</div>
            <div class="filecontent"><input type="text" style="text-align: right" placeholder="请输入手机号"/></div>
          </li>
          <li>
            <div class="filelabel">银行开卡号</div>
            <div class="filecontent">3982398239823789</div>
          </li>
          <li>
            <div class="filelabel">银行卡开户地址</div>
            <div class="filecontent"><span>山西省</span><span>阳泉市</span><span>高邑县</span></div>
          </li>
          <li>
            <div class="filelabel">银行卡开户行</div>
            <div class="filecontent">中关村西三旗支行</div>
          </li>



        </ul>
      </div>

      <div class="subc">
        <button @click="gonext(3)" class="main">提交</button>
      </div>
    </div>
    <div v-show="setpidx == 3">
      <div class="chooseMain">
        <ul>
          <li>
            <h3>个体工商户类型</h3>
            <p>请选择个体工商户类型</p>
          </li>

          <li>
            <h3>附加经营范围</h3>
            <p @click="openrange()">请选择个体工商户类型</p>
            <div class="comrange">
              <ul>
                <li class="dis">经营范经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围围</li>
                <li>经营范经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围围</li>
                <li>经营范经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围围</li>
              </ul>
            </div>
          </li>
          <li style="border:none;">
            <h3>请选择/编辑申请名称</h3>
            <ul class="rangnamelist">
              <li>镜湖区<span>刘洋壹九叁</span>商务信息咨商务信息咨询服务部商务信息咨询服务部询服务部<label @click="editcomName()" class="eidtname"><img src="../../assets/img/edit.jpg"/> </label> </li>
              <li>镜湖区<span>刘洋壹九叁</span>商务信息咨询服务部<label class="eidtname"><img src="../../assets/img/edit.jpg"/> </label> </li>
              <li>镜湖区<span>刘洋壹九叁</span>商务信息咨询服务部<label class="eidtname"><img src="../../assets/img/edit.jpg"/> </label> </li>

            </ul>
          </li>
          <button class="main"  @click="gonext(4)">提交</button>
        </ul>

      </div>

    </div>
    <div v-show="setpidx == 4">
       <elem configs="contractList"></elem>
       <div class="tx">
         <button class="main"  @click="isqz = true">一键签约(6)</button>
         <div class="xieyi"><span class="ckbox"><img src="../../assets/img/checkbox.jpg"/> </span>我已阅读并同意非全制度</div>
       </div>
    </div>

    <elem :showQz="isqz" configs="qianzi"></elem>




  </div>
</template>

<script>
  export default {
    name: "businessAuth",
    data() {
      return {
        isqz:false,
        setpidx: 1,
        upimgzm:[],
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
      editcomName(){
        this.$promot({
          name:'$promot',
          width:'80%',
          title:'修改公司',
          funCode:'modifyCom',
          props:{
            isableclose:true,
            comName:'镜湖区刘洋壹九叁商务信息咨商务信息咨询服务部商务信息咨询服务部询服务部'

          },
          callback:(close,str)=>{
            close()
            alert(str)
          }
        })
      },
      openrange(){
        this.$card({
          name:'bisRange',
          width:'90%',
          title:'经营范围选择',
          funCode:'bisRange',
          props:{
            a:1,
            b:2
          },
          callback:(close,str)=>{
            // alert(str)
            close()
          }
        })

      },
      gonext(str){
        this.$router.push({
          path:'/authPerson',
          query:{
            funCode:'businessAuth',
            setp:str
          }
        })
      },
      upinfozm(value){
        // alert(value)
        this.upimgzm.push(value)
      },

      delimgzm(){
        this.upimgzm.splice(0,1)
      }

    }
  }
</script>

<style lang="scss" scoped>
  .tx{
    position: fixed;
    bottom:20px;
    left:30px;
    right: 30px;
  }
  .xieyi{
    padding-top:5px;
    text-align: center;
    .ckbox{
      display: inline-block;width:50px;
      position: relative;
      top:15px;
      img{width:100%;}
    }
  }
  .mline{
    height:20px; background: #F6F6F6;
    clear:both;
  }

  .chooseMain{
    ul{
      padding:30px 60px;
      li{
        margin-bottom: 50px;
        border-bottom: 1px solid #EEE;
        padding-bottom: 20px;
        h3{
          font-size:35px;
          font-weight: normal;
        }
        p{color:#999; height:50px;
          line-height: 50px;
          position: relative;}
        p:after{
          content:"";
          width:40px; height:40px;
          position: absolute;
          top:5px;right:0;
          background:url("../../assets/img/arrowRight.jpg") no-repeat center; background-size: 100%;

        }

        .comrange{
          ul{
            padding:0;
            li.dis{
              background: #F6F6F6;
              color: #666;
            }
            li{
              padding:15px;
              border-radius: 10px;
              margin-bottom: 10px;
            }
          }

        }

      }
    }
    ul.rangnamelist{
      padding: 0;
      padding-top:20px;
      li{
        position: relative;

        margin:0;padding:20px 0;
        padding-right: 70px;
        span{
          color:#FF4A02;
        }
        .eidtname{
          position: absolute;
          width:60px; height:60px;
          top:15px;right:0;
          img{width:100%;}
        }
      }

    }

  }
  .busContent{

    ul{
      li{

        padding:20px;
        display: flex;
        .filelabel{
          width:300px;
          color:#999;
          font-size:30px;
        }
        .filecontent{
          font-size:30px;
          width:100%;
          text-align: right;
        }
        border-bottom:1px solid #EEE;

      }
      .fileTitle{
        font-size:30px;
        background:#F7F7F7;
        width:100%;
        border:none;
      }
    }
  }
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

  .aucontent{
    ul{
      padding:10px 30px;
      li{
        margin:10px 0;
        position: relative;

        img{
          width:100%;
        }

      }
    }
  }
  .auDemo{
    padding:10px 30px;
    img{width:100%;}
  }
  .delicon{
    position: absolute;
    top:-10px;
    right:-10px;
    background: red;
    color:#FFF;
    padding:3px 10px; border-radius: 20px;
  }

</style>
