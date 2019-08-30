<template>
    <div class="reds">hello <h3>
    </h3>

      <div class="upimgs">
        <ul>
          <li v-if="upimgs.length>0">{{upimgs}}  <span @click="delimg()">删除</span></li>
          <li v-else><wxupload @upinfo="upinfo"></wxupload></li>
        </ul>
      </div>
    </div>
</template>

<script>
  export default {
    name: "hello",
    data(){
      return{
        upimgs:[]
      }

    },
    methods:{
      upinfo(value){
        // alert(value)
        this.upimgs.push(value)
      },
      delimg(){
        this.upimgs.splice(0,1)
      }

    }
  }
</script>

<style lang="scss" scoped>
.reds{
  color:red;
  h3{
    color:#08F;
  }
  .upimgs{
    width:98%;
    border-radius: 15px;
    margin:0 auto;
    overflow: hidden;
    ul{
      li{
        position: relative;
        width:25%;height:120px;
        border:1px solid #DDD;
      }
    }

  }
}
</style>
