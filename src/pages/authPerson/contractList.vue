<template>
   <div>
     <div v-if="mydevice">
       <div class="contractBar">

         <div class="leftnav ">

           <div class="slideitem" @click="changec(index)" :class="curTab == index?'cur':''" v-for="c,index in clist">{{c.contract_name}}
             <!--<span><img src="../../assets/img/reda.png"/> </span>-->
           </div>





         </div>
         <div class="lefticon" v-show="clist.length>1" @click="showm = !showm"><label><img src="../../assets/img/reda.png"/></label></div>





       </div>
       <div class="ppdiv" v-show="showm">
         <div class="mmc" >
           <p  @click="changeitem(index)" :class="curTab == index?'cur':''" v-for="c,index in clist">{{c.contract_name}}</p>

         </div>

       </div>
       <div class="contContent" id="fcontent">
         <!--<iframe  v-show="!showm && curUrl"  :src="curUrl"   frameborder="0"  class="contractFrame"></iframe>-->
       </div>
     </div>
     <div class="htview" v-if="!mydevice">

       <h3>合同列表</h3>
       <ul>
         <li v-for="c,index in clist"><a target="_blank" :href="conurl+c.url">{{c.contract_name}}</a></li>
       </ul>
     </div>



   </div>


</template>

<script>
  import { CONTRACT_URL } from '@/constants'
  export default {
    name: "contract-list",
    data(){
      return{
        showm:false,
        conurl:'',
        curUrl:'',
        mydevice:false,
        curTab:0,
        clist:[],
      }
    },
    created(){

      this.conurl = CONTRACT_URL
      var u = navigator.userAgent;

      if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
        this.mydevice = true;
      }else{
        this.mydevice = false;
      }


      this.getcontract()
    },
    methods:{
      changeitem(idx){
        this.curTab = idx;
        this.curUrl = CONTRACT_URL+this.clist[this.curTab].url
        this.showm = false;
      },
      changec(idx){
        this.curTab = idx;
        this.curUrl = CONTRACT_URL+this.clist[this.curTab].url;
        document.getElementById('fcontent').innerHTML = ''
        if(this.mydevice){
          this.creatFrame(this.curUrl)
        }

      },
      creatFrame(url){
        var iframe = document.createElement('iframe');
        iframe.src = url;
        // iframe.classList('contractFrame')
        iframe.setAttribute('id','conFrame')
        iframe.setAttribute('frameborder','0')
        iframe.style.width="100%"
        iframe.style.height="100%"
        iframe.style.position="absolute"
        document.getElementById('fcontent').appendChild(iframe);
      },
      getcontract(){
        this.request.post('mapi/getUserContract',{
          company_id:this.$route.query.cid
        }).then(res=>{
          this.clist = res.data

          window.connumb = this.clist.length
          this.curUrl = CONTRACT_URL+this.clist[this.curTab].url;
          this.creatFrame(this.curUrl)
          this.$emit('contactnumb','https://www.baidu.com/img/bd_logo1.png?qua=high')

        })
      },

    }
  }
</script>

<style lang="scss" scoped>
  .htview{
    padding-top: 40px;
    h3{
      text-align: center;
      font-size: 30px;
    }
    ul{

      padding:30px;
      li{
        padding:20px;
        border-bottom: 1px solid #eee;
        a{
          color:#ff4a02;

        }
      }

    }

  }
  .alls{
    position: absolute;
    background: #FFF;
    top:140px;
    left:0;right:0;
    padding:30px;
    p{padding:20px; border-bottom: 1px solid #EEE}

  }
  .contractBar{
    position: relative;
    height:80px;
    box-shadow: 0 2px 10px rgba(0,0,0,.2);
    .leftnav{
      position: absolute;
      top:0;right:100px;
      left:0;
      bottom:0;
      display: -webkit-box;
      overflow: hidden;
      overflow-x: scroll;
      -webkit-overflow-scrolling:touch;
      .slideitem{
        position: relative;line-height: 100%;
        margin:0 30px;
        font-size:30px;
        line-height: 80px;
        span{
          position: absolute;
          bottom:-20px;
          left:50%;
          margin-left:-20px;
          width:20px;img{width:100%;}
        }
      }
      .cur{
        color:#FF4a02;
      }


    }
    .lefticon{
      position: absolute;
      width:70px;
       text-align: center;
      vertical-align:middle;
       bottom:20px;
      right:0;top:20px;
      border-left:1px solid #EEE;
      label{width:25px;display: inline-block;img{width:100%;
        position: relative; top:0px;}}
    }


  }
  .ppdiv{
    position: fixed;
    top:140px;
    width:100%;height:100%;

    .mmc{
      background: #FFF;
      box-shadow: 0 2px 10px rgba(0,0,0,.2);
      padding:20px;
      p{
        padding:15px; border-bottom: 1px solid #EEE;
      }
      .cur{
        color:#FF4a02
      }
    }
    z-index: 999;

    bottom:0;
    background:rgba(0,0,0,.5);
  }
  .contContent{
    position:absolute;
    bottom:190px;
    top:150px;left:0;right:0;


    .contractFrame{
      position: relative;
      width:100%;
      height: 100%;
    }

  }
</style>
