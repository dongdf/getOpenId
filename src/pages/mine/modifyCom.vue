<template>
    <div class="mondifycontent" >
      <textarea type="text" class="tx" v-model="cname" placeholder="请修改后的公司名称"/>
      <div class="qbtn" style="bottom:-20px;">
        <span @click="mdok">保存</span>
      </div>
    </div>
</template>

<script>
  export default {
    props:['comName'],
    name: "qyts",
    data(){
      return{
        cname:''
      }
    },
    created(){
      this.cname = this.comName
    },
    methods:{
      mdok(){
        this.callback(this.cname)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .mondifycontent{
    padding:30px 25px;
    margin:20px 0;
    .tx{
      font-size:35px;
      padding:10px;
      border:none;
      border-bottom: 1px solid #DDD;
      width:100%;
      outline: none;
    }

  }
</style>
