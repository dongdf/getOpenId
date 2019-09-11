<template>
    <div class="cards">
      <ul>
        <li @click="prewimg(burl+cardinfo.zidimg)"><img :src="burl+cardinfo.zidimg"/></li>
        <li @click="prewimg(burl+cardinfo.fidimg)"><img :src="burl+cardinfo.fidimg"/></li>
      </ul>
    </div>
</template>

<script>
  import {IMG_URL} from "@/constants";

  export default {
    props:['cardinfo'],
    name: "idcardview",
    data(){
      return{
        burl:''
      }
    },
    created(){
      this.burl = IMG_URL
    },
    methods:{
      prewimg(str){
        wx.ready(function (){
          var arr = []
          arr.push(this.burl+this.cardinfo.zidimg)
          arr.push(this.burl+this.cardinfo.fidimg)
          wx.previewImage({
            current: str, // 当前显示图片的http链接
            urls: arr.split(',') // 需要预览的图片http链接列表
          });
        })

      }

    }
  }
</script>

<style lang="scss" scoped>

  .cards{
    ul{
      padding:40px;
      li{
        padding:30px 0;
        img{
          width:100%;
        }

      }
    }
  }
</style>
