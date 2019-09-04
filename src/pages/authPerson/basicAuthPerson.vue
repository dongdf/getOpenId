<template>
   <div class="aucontent">
     <ul>

       <li v-if="upimgzm.length>0">
         <img src="../../assets/img/uploadDemo.png"/>
         <span class="delicon" @click="delimgzm()">删除</span></li>
       <li @click="chooseimgs(1)" v-else><img src="../../assets/img/authZm.jpg"/><wxupload ref="zm" @upinfo="upinfozm"></wxupload></li>

       <li v-if="upimgfm.length>0">
         <img src="../../assets/img/uploadDemo.png"/>
         <span  class="delicon" @click="delimgfm()">删除</span></li>
       <li  @click="chooseimgs(2)" v-else><img src="../../assets/img/authFm.jpg"/><wxupload ref="fm" @upinfo="upinfofm"></wxupload></li>

     </ul>
     <div class="auDemo">
       <img src="../../assets/img/authDemo.jpg"/>
     </div>
   </div>
</template>

<script>
  export default {
    name: "basicAuthPerson",
    data(){
      return{
        upimgzm:[],
        upimgfm:[]
      }

    },
    methods:{
      chooseimgs(str){
        if(str == 1){
          this.$refs.zm.chooseImg('zm');
        }else {
          this.$refs.fm.chooseImg('fm');
        }


      },
      upinfozm(value){
        // alert(value)
        this.upimgzm.push(value)
      },
      upinfofm(value){
        // alert(value)
        this.upimgfm.push(value)
      },

      delimgzm(){
        this.upimgzm.splice(0,1)
      },
      delimgfm(){
        this.upimgfm.splice(0,1)
      }

    }
  }
</script>

<style lang="scss" scoped>

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
