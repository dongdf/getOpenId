<template>
   <div>
     <div class="contractBar">
       <div class="leftbox fl">
         <div class="leftnav ">
           <ul>
             <li>非全日制合同<i></i></li>
             <li>委托授权书</li>
             <li>非全日制合同</li>
             <li>委托授权书</li>
           </ul>
         </div>
       </div>

       <div class="right-btn fr"><i></i></div>
     </div>
     <div class="contContent">
       <iframe src="http://www.qq.com" frameborder="0"  class="contractFrame"></iframe>
     </div>
   </div>


</template>

<script>
  export default {
    name: "contract-list",
    methods:{

    }
  }
</script>

<style lang="scss" scoped>
  .contractBar{height:80px;margin:0;
    .leftbox{width:90%;height:80px;overflow: hidden;margin:0;
      .leftnav{overflow-x:auto;width:100%;margin:0;height:100px;
        ul{display: inline-block;white-space: nowrap;margin:0;
          li{display:inline-block;padding:10px 10px 20px 10px;font-size:32px;margin:0;position: relative;
            i{
              position:absolute;width: 0;height:0;border-top:12px solid #ff5b2d;border-right:20px solid transparent;border-left:20px solid
              transparent;bottom:6px;left:50%;margin-left:-12px;}
          }
        }
      }
    }

    .right-btn{width:10%;
      i{display:block;width:0;height:0;border-top:24px solid #ff5b2d;border-left:20px solid transparent;border-right:20px solid
        transparent;margin:20px auto}
    }

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
