<template>
   <div class="aucontent">
     <ul>

       <li v-if="upimgzm">
         <img :src="upimgzm" />
         <span class="delicon" @click="delimgzm()">删除</span></li>
       <li @click="chooseimgs(1)" v-else><img src="../../assets/img/authZm.jpg"/><wxupload ref="zm" @upinfo="upinfozm"></wxupload></li>

       <li v-if="upimgfm">
         <img :src="upimgfm"/>
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
        upimgzm:'',
        upimgfm:''
      }

    },
    methods:{
      chooseimgs(str){
        if(str == 1){
          this.$refs.zm.chooseImg('1');
        }else {
          this.$refs.fm.chooseImg('2');
        }


      },
      upinfozm(value){
        // alert(value)
        this.upimgzm = value
      },
      upinfofm(value){
        // alert(value)
        this.upimgfm = value
      },

      delimgzm(){

        this.upimgzm =''
      },
      delimgfm(){
        this.upimgfm =''
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
