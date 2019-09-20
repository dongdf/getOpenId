<template>
<div class="mycon">
  <div class="conlist">
    <ul>
      <!--v-show="conlist.length == 0"-->
      <div v-show="conlist.length == 0" class="nocon">
        <img src="../../assets/img/nohetong.png"/>
        <br>
        暂无合同
      </div>
      <li v-for="c,index in  conlist">
        <div class="coninfo">
          <div class="iteminfo">
            <p class="jtitle">签约时间:{{c.start_at}}</p>
            <h3>{{c.company_name}}/{{c.member_contract_str}}</h3>
            <p class="timer">{{c.contracts}}</p>
          </div>
          <div class="iteminfobtn">
            <a class="main sm" target="_blank" :href="burl+'mapi/getContract/'+c.contracts">查看合同</a>
          </div>

        </div>
        <div class="contractState"><img src="../../assets/img/c_yqy.png"/> </div>
      </li>
      <div>
        {{pdf}}
      </div>
      <!--<li>-->
        <!--<div class="coninfo">-->
          <!--<div class="iteminfo">-->
            <!--<p class="jtitle">sdsdfdfsfddsfdfsfd</p>-->
            <!--<h3>合同名称合同名称合同名称合同名称合同名称合同名称</h3>-->
            <!--<p class="timer">230230932902390</p>-->
          <!--</div>-->
          <!--<div class="iteminfobtn">-->
            <!--<button class="main sm trans">立即续签</button>-->
          <!--</div>-->

        <!--</div>-->
        <!--<div class="contractState"><img src="../../assets/img/c_ygq.png"/> </div>-->
      <!--</li>-->
      <!--<li>-->
        <!--<div class="coninfo">-->
          <!--<div class="iteminfo">-->
            <!--<p class="jtitle">sdsdfdfsfddsfdfsfd</p>-->
            <!--<h3>合同名称合同名称合同名称合同名称合同名称合同名称</h3>-->
            <!--<p class="timer">230230932902390</p>-->
          <!--</div>-->
          <!--<div class="iteminfobtn">-->
            <!--<button class="main sm trans">立即续签</button>-->
          <!--</div>-->

        <!--</div>-->
        <!--<div class="errin">-->
          <!--这里展示审核失败原因！！这里展示审核失败原因这里展示审核失败原因-->
        <!--</div>-->
        <!--<div class="contractState"><img src="../../assets/img/c_sb.png"/> </div>-->
      <!--</li>-->

    </ul>
  </div>
</div>
</template>

<script>
  import {XIEYI_URL} from '@/constants'
  export default {
    name: "my-contract",
    data(){
      return{
        conlist:[],
        pdf:'',
        burl:''
      }
    },
    created(){
      this.getcon();
      this.burl = XIEYI_URL
    },
    methods:{
      // viewpdf(obj){
      //   var x = XIEYI_URL+'mapi/getContract/'+obj.contracts
      //
      //   location.href = ;
      //   return false;
      //
      // },
      getcon(){
        this.request.post('mapi/showContracts').then(res=>{
          this.conlist =res.data;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nocon{
    padding:30px;
    padding-top:50%;
    img{width:30%;}
    text-align: center;
    color:#999;
  }
.coninfo{
  position: relative;
  z-index:9;
}

  .mycon{
    height:100%;background:#F6F6F6;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling:touch;
    .conlist{
      ul{
        padding:20px 30px;
        li{
          .contractState{
            position: absolute;
            left:45%;
            opacity: .5;
            z-index: 1;
            top:10%;
            height:220px;

            img{height:80%;}
          }
          .errin{
            padding:20px 50px 30px 50px;
            color:red;
            box-shadow:inset 0px 35px 20px -15px rgba(255,96,55,.1);

          }
          margin:20px 0;
          background: #FFF;
          border-radius: 30px;
          box-shadow: 0 0 30px rgba(119,119,119,.1);
          min-height: 180px;
          position: relative;
          .iteminfo{
            padding:30px 50px;
            padding-bottom: 20px;
            h3{font-weight: normal;font-size:30px; padding:20px 0; padding-right:250px;}
            .jtitle{
              color:#999;

            }
            .timer{
              color:#999;
              text-align: right;
              padding-bottom: 10px;
            }
          }
          .iteminfobtn{
            position: absolute;
            width:180px;
            top:80px;right:20px;
          }

        }
      }
    }
  }
</style>
