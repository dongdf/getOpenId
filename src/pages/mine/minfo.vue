<template>
    <div class="mbginfo">
      <div class="headertop">
      <div class="pinfoheader">
        <img class="bgimg" v-if="curInfo.role == 1" src="../../assets/img/pbanner2.jpg"/>
        <img class="bgimg" v-if="curInfo.role!=1 && curInfo.role!=''" src="../../assets/img/pbanner1.jpg"/>
        <img class="bgimg" v-if="curInfo.role == 0 " src="../../assets/img/pbanner1.jpg"/>
        <div class="pinfoContent">
           <div class="headerimg">
             <img  :src="curInfo.avatar?curInfo.avatar:morehead"/>
           </div>
           <div class="headerinfos">
             <h3>{{curInfo.name?curInfo.name:curInfo.nickname}}<span v-show="!curInfo.sign_status && curInfo.role!=0">未签约</span></h3>
             <p @click="gocompany()" v-show="allcList.length>1"><label v-show="curInfo.role !=0" class="micons">
               <img v-show="curInfo.role == 2" src="../../assets/img/storeicon2.png"/>
               <img v-show="curInfo.role == 1 || curInfo.role == 3 " src="../../assets/img/storeicon1.png"/>
             </label> {{curInfo.company_name}}<label class="micons"><img class="downimg" src="../../assets/img/storedown.png"/> </label></p>
             <p v-show="allcList.length==1"><label v-show="curInfo.role !=0" class="micons">
               <img v-show="curInfo.role == 2" src="../../assets/img/storeicon2.png"/>
               <img v-show="curInfo.role == 1 || curInfo.role == 3 " src="../../assets/img/storeicon1.png"/>
             </label> {{curInfo.company_name}}</p>
           </div>
        </div>
      </div>
      <div class="quickinfo">

        <div class="quickItem">
          <h3>--</h3>
          <p>钱包(元)</p>
        </div>
        <div class="quickItem">
          <div class="lines"></div>
          <h3>--</h3>
          <p>积分(UHRB)</p>
        </div>
        <div @click="gopage('myContract')" class="quickItem">
          <div class="lines"></div>
          <h3>{{topinfo.contract_count}}</h3>
          <p>合同</p>
        </div>

      </div>

      <div class="quickicon" @click="showtip">
        <div class="quickiconItem">
          <div class="iconimg"><img  src="../../assets/img/picon1_1.jpg"/></div>
          <p>优享+</p>
        </div>
        <div class="quickiconItem">
          <div class="iconimg"><img  src="../../assets/img/picon1_2.jpg"/></div>
          <p>体检订单</p>
        </div>
        <div class="quickiconItem">
          <div class="iconimg"><img  src="../../assets/img/picon1_3.jpg"/></div>
          <p>个体工商户</p>
        </div>
        <div class="quickiconItem">
          <div class="iconimg"><img  src="../../assets/img/picon1_4.jpg"/></div>
          <p>业务外包</p>
        </div>
      </div>
      </div>
      <div class="mlists">
<!--用工宝-->
        <ul @click="showtip()" v-show="curInfo.role  == 1">
          <li>
            <div class="lname">我的工作</div>
            <div class="lbq"><span style="display: none">3988</span><i class="aright"><img src="../../assets/img/arrowRight.jpg"/> </i></div>
          </li>
          <li>
            <div class="lname">我的工资条</div>
            <div class="lbq"><i class="aright"><img src="../../assets/img/arrowRight.jpg"/> </i></div>
          </li>
        </ul>
<!--用工宝-->

        <!--创业宝-->
        <ul  @click="showtip()" v-show="curInfo.role  == 2">
          <li>
            <div class="lname">我的个体工商执照</div>
            <div class="lbq"><i class="aright"><img src="../../assets/img/arrowRight.jpg"/> </i></div>
          </li>
          <li>
            <div class="lname">我的业务承揽</div>
            <div class="lbq"><i class="aright"><img src="../../assets/img/arrowRight.jpg"/> </i></div>
          </li>
          <li>
            <div class="lname">我的佣金</div>
            <div class="lbq"><i class="aright"><img src="../../assets/img/arrowRight.jpg"/> </i></div>
          </li>
          <li>
            <div class="lname">我的发票</div>
            <div class="lbq"><i class="aright"><img src="../../assets/img/arrowRight.jpg"/> </i></div>
          </li>
        </ul>
        <!--创业宝-->


<!--分工宝-->

        <ul  @click="showtip()" v-show="curInfo.role  == 3">

          <li>
            <div class="lname">我的业务承揽</div>
            <div class="lbq"><i class="aright"><img src="../../assets/img/arrowRight.jpg"/> </i></div>
          </li>
          <li>
            <div class="lname">我的佣金</div>
            <div class="lbq"><i class="aright"><img src="../../assets/img/arrowRight.jpg"/> </i></div>
          </li>
          <li>
            <div class="lname">我的发票</div>
            <div class="lbq"><i class="aright"><img src="../../assets/img/arrowRight.jpg"/> </i></div>
          </li>
        </ul>
<!--分工宝-->

      </div>
    </div>
</template>

<script>
  export default {
    name: "minfo",
    data(){
      return{
        curInfo:{role:''},
        morehead:require('../../assets/img/moren.jpg'),
        allcList:[],
        topinfo:{}

      }
    },
    created(){
      // if(this.$route.query.id){
      //   this.getCurinfo(this.$route.query.id)
      // }else {
        this.getallcom()
      // }

      // this.getCurinfo()
      this.gettopInfo();
    },
    methods:{
      gettopInfo(){
        this.request.post('mapi/showTopData').then(res=>{
          this.topinfo = res.data
        })

      },
      gopage(str){

        if(this.checkcontract()){

          this.$router.push({
            path:'/mine',
            query:{
              funCode:str
            }
          })
        }

      },
      gocompany(){
        this.$router.replace({
          path:'/mine',
          query:{
            funCode:'selectCompany'
          }
        })
      },
      getallcom(){
        this.request.post('mapi/getCompanyList',{}).then(res=>{
          if(res.code == 0){
            this.allcList = res.data;
            if(this.$route.query.id){
              this.getCurinfo(this.$route.query.id)
            }else{
              if(res.company){
                this.getCurinfo(res.company.cmpy_id)
              }else{
                this.getCurinfo(res.data[0].cmpy_id)
              }
            }


          }else{
            this.$toast(res.msg)
          }

        },error=>{

          this.$messagebox.alert('获取公司列表失败！')


        })
      },
      showtip(){
        this.$messagebox.alert('建设中,敬请期待')
      },
      checkcontract(){
        if(!this.curInfo.sign_status){


            if(this.curInfo.role == 1){//用工宝
              this.$promot({
                name:'$promot',
                width:'80%',
                title:'基本信息',
                funCode:'qyts',
                props:{
                  isableclose:true,
                  tipText:'请签约合同用工宝合同'

                },
                callback:(close)=>{

                  close();
                  this.$router.push({
                    path:'/authPerson',
                    query:{
                      funCode:'teamAuth',
                      setp:2,
                      cid:this.curInfo.cmpy_id
                    }
                  })
                }
              })
              return false;
            }else if(this.curInfo.role == 2){//创业宝宝
              this.$promot({
                name:'$promot',
                width:'80%',
                title:'基本信息',
                funCode:'qyts',
                props:{
                  isableclose:true,
                  tipText:'请签约合同用工宝合同'

                },
                callback:(close)=>{
                  close();
                  this.$router.push({
                    path:'/authPerson',
                    query:{
                      funCode:'businessAuth',
                      setp:2,
                      cid:this.curInfo.cmpy_id
                    }
                  })
                }
              })
              return false;
            }else if(this.curInfo.role == 3){//用工宝
              this.$promot({
                name:'$promot',
                width:'80%',
                title:'基本信息',
                funCode:'qyts',
                props:{
                  isableclose:true,
                  tipText:'请签约创业宝合同'

                },
                callback:(close)=>{
                  close();
                  this.$router.push({
                    path:'/authPerson',
                    query:{
                      funCode:'personalAuth',
                      setp:2,
                      cid:this.curInfo.cmpy_id
                    }
                  })
                }
              })
              return false;
            }else{
              return true;
            }





        }else {
          return true
        }


      },
      getCurinfo(id){
        this.request.post('mapi/getOneCompanyInfo',{company_id:id}).then(res=>{
          if(res.code == 0){
            this.curInfo = res.data


            this.checkcontract();
            // this.$toast(res.msg)

          }else{
            alert(res.msg)
          }

        },error=>{
          this.$messagebox.alert('获取信息失败,点击右上角三个点选择刷新！')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mbginfo{
    background: #FFF;
    position:relative;
    height:100%;
  }
  .mlists{
    padding-top:30px;
    ul{
      padding:0 30px;
      padding-left: 40px;
      li{
        border-bottom: 1px solid #EEE;
        display: flex;
        padding:25px 0;
        position: relative;


        .lname{
          width:100%;
          font-size:30px;

        }
        .lbq{

          text-align: right;
          padding-right:60px;
          span{
            background: red;
            padding:2px 15px;
            color:#FFF;
            border-radius:20px;
          }
          .aright{
            width:40px;
            position: absolute;
            top:15px;
            right:10px;
            img{width:100%}
          }
        }
      }
    }
  }

  .quickinfo{
    display: flex;
    padding-top:10px;
    .quickItem{
      position: relative;
      .lines{
        position: absolute;
        width:2px;
        height:100%;
        top:0;left:0;
        background: #EEE;
      }
      text-align: center;
      width:100%;
      h3{
        font-size:45px;
      }
      p{
        color:#999;
      }
    }
  }
  .headertop{
    box-shadow: 0 5px 50px rgba(0,0,0,.1);
    background: #FFF;
    padding-bottom: 20px;
  }
  .quickicon{
    margin-top:40px;

    padding-top:20px;
    border-top: 1px solid #EEE;
    display: flex;
    .quickiconItem{
      width:100%;
      text-align: center;
      .iconimg{width:100px;margin:0 auto; img{width:100%;}}
      p{
        color:#333;
      }

    }
  }

  .pinfoheader{
    position:relative;
    min-height: 150px;
    .bgimg{width:100%}
    .pinfoContent{
      position: absolute;

      top:48px;left:58px;
      right:0;
      bottom:0;
      z-index: 9;
      display: flex;
      .headerimg{
        width:120px;height:120px;
        border-radius: 1000px;
        overflow: hidden;
        img{width:100%; height: 100%;}
      }
      .headerinfos{
        padding-left:10px;
        padding-top:15px;
        color:#FFF;
        h3{font-size:35px;
          span{font-size:25px;
           background: rgba(255,255,255,.3);
            position: relative;
            left:10px; top:-3px;
            padding:4px 10px;
            border-radius: 50px;
            color:#FFF;
          }
        }
        p{
          .micons{
            display: inline-block;
            width:40px;
            vertical-align: middle;
            img{width:100%;}
            .downimg{width:50%;margin-left:5px;
              position: relative; top:-5px;}

          }
          padding-top:10px;
        }


      }
    }
  }
</style>
