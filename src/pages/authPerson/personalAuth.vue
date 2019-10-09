<template>
  <div>
    <div class="forgetSetp">
      <ul class="clearfix">
        <li class="leftli active"><a ><i>1</i><span>身份验证</span></a></li>
        <li v-bind:class="setpidx>=2?'leftli active':'leftli'"><a ><i>2</i><span>填写资料</span></a></li>
        <li  v-bind:class="setpidx>=3? 'active':''"><a ><i>3</i><span>签约</span></a></li>

      </ul>
    </div>
    <div v-show="setpidx == 1">
      <div class="ptips">
        <!--请拍摄上传<span>张三</span>的身份证-->
        <p>国家要求网络运营者为在与用户签订协议或者提供服务时，用户需提供真实身份信息</p>
      </div>
      <elem configs="basicAuthPerson"></elem>
      <div class="subc">
        <button @click="gonext(2)" class="main">提交</button>
      </div>

    </div>

    <div v-show="setpidx == 2">
      <div class="busContent">
        <ul>

          <li class="fileTitle">基本信息</li>
          <li>
            <div class="filelabel">姓名</div>
            <div class="filecontent" style="color:#666;"  >
              <!--<input v-model="curInfo.name"  type="text" style="text-align: right" placeholder="请输入姓名"/>-->
              {{curInfo.name}}
            </div>
          </li>
          <li>
            <div class="filelabel">性别</div>
            <div class="filecontent" style="color:#666;"  >
              <span>{{curInfo.sex_str}}</span>
              <!--<div class="resext">-->
              <!--<label><i class="ichecked"></i>男</label>-->
              <!--<label><i></i>女</label>-->
              <!--</div>-->
            </div>
          </li>
          <li>
            <div class="filelabel">身份证</div>
            <div class="filecontent" style="color:#666;"  >
              {{curInfo.id_card}}
              <!--<input v-model="curInfo.id_card"  type="text" style="text-align: right" placeholder="请输入身份证"/>-->
            </div>
          </li>
          <li>
            <div class="filelabel">生日</div>
            <div class="filecontent" style="color:#666;"  >{{curInfo.birthday}}</div>
          </li>
          <li>
            <div class="filelabel">户籍所在地</div>
            <div class="filecontent" style="color:#666;"  >
              {{curInfo.address}}
              <!--<input v-model="curInfo.registration"  type="text" style="text-align: right" placeholder="请输入户籍所在地"/>-->
            </div>
          </li>
          <li>
            <div class="filelabel">身份证</div>
            <div class="filecontent" style="color:#00B12E" @click="viewIdcard">
              <span>已上传<i class="rightas"><img src="../../assets/img/righta.jpg"/> </i></span>
            </div>
          </li>

          <li class="fileTitle">其它信息</li>

          <li>
            <div class="filelabel"  >手机号</div>
            <div class="filecontent"  style="color:#666;"  >
              {{curInfo.phone}}
              <!--<input v-model="curInfo.phone"  type="number" style="text-align: right" placeholder="请输入手机号"/>-->
              <!--<input v-model="curInfo.phone"  type="number" style="text-align: right" placeholder="请输入手机号"/>-->
            </div>
          </li>
          <li>
            <div class="filelabel">银行开卡号</div>
            <div class="filecontent">
              {{curInfo.bank_account}}
              <!--<input v-model="curInfo.bank_account"  type="text" style="text-align: right" placeholder="请输入银行开卡号"/>-->
            </div>
          </li>
          <li>
            <div class="filelabel">银行卡开户地址</div>
            <div class="filecontent" @click="areaShow = true">{{areaselectname?areaselectname:'请选择开户行'}}<i class="rightas"><img src="../../assets/img/righta.jpg"/> </i></div>
          </li>
          <li>
            <div class="filelabel">银行卡开户行</div>
            <div class="filecontent">
              {{curInfo.bank_name}}
              <!--<input v-model="curInfo.bank_name"  type="text" style="text-align: right" placeholder="请输入银行卡开户行"/>-->
            </div>
          </li>


          <!--<li>-->
            <!--<div class="filelabel">学历</div>-->
            <!--<div class="filecontent">-->
              <!--<span @click="selectXl()">{{curInfo.education?curInfo.education:'初中'}}<i class="rightas"><img src="../../assets/img/righta.jpg"/> </i></span>-->
            <!--</div>-->
          <!--</li>-->
          <!--<li>-->
            <!--<div class="filelabel">每小时工资</div>-->
            <!--<div class="filecontent" style="color:#666;"  >￥20</div>-->
          <!--</li>-->
          <!--<li>-->
          <!--<div class="filelabel">工种</div>-->
          <!--<div class="filecontent">初中，小学，默认初中</div>-->
          <!--</li>-->



        </ul>
      </div>

      <div class="subc">
        <button @click="gonext(3)" class="main">提交</button>
      </div>
    </div>
    <div v-if="setpidx == 3">
      <elem configs="contractList" ref="cons"  v-show="!isqz"></elem>
      <div class="tx">
        <button class="main"  @click="isqz = true">一键签约({{cnumb}})</button>
        <!--<div class="xieyi"><span class="ckbox"><img src="../../assets/img/checkbox.jpg"/> </span>我已阅读并同意非全制度</div>-->
      </div>
    </div>

    <elem :showQz="isqz" :numbs="cnumb" :qname="curInfo.name"  configs="qianzi"></elem>


    <div :is="item.component" v-for="item in itemComponents" :pickerShow="item.isshow" :pickerList="item.data"  @itemok="itemOk" @itemcancle="itemCancle"></div>

    <areas :pickerShow="areaShow" @areaok="areaOk" @areacancle="areaCancle"></areas>
  </div>
</template>

<script>

  import pickeritem from '../../components//pickercustom/picker'
  import areas from '../../components//area/chsArea'
  import {IMG_URL} from '@/constants'
  export default {

    components:{pickeritem,areas},

    name: "personalAuth",
    data() {
      return {
        itemComponents:[],
        areaShow:false,
        selectAreaInfo:{},
        isshow:false,
        isxueli:false,
        isqz:false,
        setpidx: 1,
        upimgzm:[],
        curInfo:{},
        timer: 10,
        timerText: '获取验证码',
        codeSending: true,
        phone: '',
        phoneCode: '',
        fitem2:[
          {classfyName:'小学',value:1},
          {classfyName:'初中',value:2}

        ],
        areaselectname:'',
        cnumb:0,

      }
    },
    created() {
      this.setpidx = this.$route.query.setp ? this.$route.query.setp : 1;
      if(this.$route.query.cid){
        this.getCurinfo(this.$route.query.cid)
      }
      setTimeout(()=>{
        this.cnumb = window.connumb
        // console.log(this.$refs.cons.$children[0].clist)
      },500)





    },
    methods: {
      viewIdcard(){
        // this.$card({
        //   funCode:'idcardview',
        //   width:'90%',
        //   title:'身份证预览',
        //   props:{
        //     cardinfo:this.curInfo
        //   }
        // })
        this.$router.push({
          path:'/authPerson',
          query:{
            funCode:'idcardview',
            zidimg:this.curInfo.zidimg,
            fidimg:this.curInfo.fidimg
          }
        })
      },
      contactnumb(value){
        alert(value)
      },
      areaOk(areaObj){
        console.log(JSON.stringify(areaObj))
        this.areaShow = false;
        this.areaselectname = areaObj.province.name+'/'+areaObj.city.name+'/'+areaObj.county.name;
        this.selectAreaInfo = areaObj;
      },
      areaCancle(){
        this.areaShow = false;
      },
      itemOk(obj){
        this.itemComponents[0].isshow=false;
        this.itemComponents=[];
        this.curInfo.education = obj.selectItem.classfyName
        console.log(obj)
      },
      itemCancle(){
        this.itemComponents[0].isshow=false;
        this.itemComponents=[];
      },
      selectXl(){
        this.itemComponents.push({
          component:pickeritem,
          data: this.fitem2,
          isshow:true
        })
      },

      getCurinfo(id){
        this.request.post('mapi/getOneCompanyInfo',{company_id:id}).then(res=>{
          if(res.code == 0){
            this.curInfo = res.data
            if(res.data.bank_aname){
              this.areaselectname = res.data.bank_pname+'/'+res.data.bank_cname+'/'+res.data.bank_aname
              this.selectAreaInfo = {
                "province":{
                  "name":res.data.bank_pname,
                  "code":res.data.bank_pid
                },
                "city":{
                  "name":res.data.bank_cname,
                  "code":res.data.bank_cid
                },
                "county":{
                  "name":res.data.bank_aname,
                  "code":res.data.bank_aid
                }
              };
            }


          }else{
            this.$toast(res.msg)

          }

        },error=>{
          this.$messagebox.alert('获取信息失败,点击右上角三个点选择刷新！')
        })
      },
      closepp(){
        this.isqz =false;
      },
      checkThree(obj){
        return new Promise((reslove,reject)=>{

          this.request.post('mapi/checkThree',{
            company_id:this.$route.query.cid,
            name:obj.name,
            bank_account:obj.bank_account,
            id_card:obj.id_card

          }).then(res=>{
            if(res.code == 0){
              reslove()
            }else {
              reject(res.msg)
            }
          },error=>{
            reject('请求失败，请重新提交')
          })
        })
      },
      gonext(str){
        if(!this.curInfo.bank_account){
          this.$toast('请输入银行开卡号')
          return false
        }
        if(!this.selectAreaInfo.county){
          this.$toast('请选择银行卡开户地址')
          return false
        }
        if(!this.curInfo.bank_name){
          this.$toast('请输入银行卡开户行')
          return false
        }
        if(!this.$options.filters.isphone(this.curInfo.phone)){
          this.$toast('请输入正确的手机号')
          return false
        }
        this.checkThree(this.curInfo).then(cres=>{

          var pdata = {
            province_id:this.selectAreaInfo.province.code,
            province:this.selectAreaInfo.province.name,
            city_id:this.selectAreaInfo.city.code,
            city:this.selectAreaInfo.city.name,
            area_id:this.selectAreaInfo.county.code,
            area:this.selectAreaInfo.county.name,
            bank_account:this.curInfo.bank_account,
            bank_name:this.curInfo.bank_name,
            // address:this.curInfo.address?this.curInfo.address:'暂无地址',
            education:this.curInfo.education?this.curInfo.education:'初中',
            company_id:this.$route.query.cid,
            id:this.curInfo.id,
            hourly_wage:20,
          }
          this.request.post('mapi/saveInfo',pdata).then(res=>{
            if(res.code == 0){
              this.$router.push({
                path:'/authPerson',
                query:{
                  funCode:'personalAuth',
                  cid:this.$route.query.cid,
                  setp:str
                }
              })
            }else{
              alert(res.msg)
            }


          },error=>{
            alert('请重新保存')
          })


        },error=>{
          alert(error)
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
  .rightas{
    display: inline-block;
    width:40px;
    text-align: center;
    img{width:60%;
      vertical-align: center;
      position: relative; top:0px}
    vertical-align: center;
  }
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

        }
        .filecontent{

          width:100%;
          text-align: right;
        }
        border-bottom:1px solid #EEE;

      }
      .fileTitle{

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
    padding:0 50px;
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
