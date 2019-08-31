<template>
    <div style="text-align: center;padding:20px;">
      动态加载组件<br>

      <mt-button type="default" size="large">default</mt-button>
      <br>
      <mt-button type="primary" size="large" @click.native="opencard">加载右侧</mt-button>
      <br>
      <mt-button type="danger" size="large" @click.native="openpromot">弹出签署提示</mt-button>
      <mt-button type="danger" size="large" @click.native="openpromot2">弹出修改公司提示</mt-button>



       <button @click="errinfo()">错误提示</button>
       <button @click="successInfo">正确提示</button>

      <!--<button @click="opencard">加载左侧opencard</button>-->
      <!---->
      <!--<button >弹出内容</button>-->
    </div>
</template>

<script>
  export default {
    name: "fun",

    methods:{
      errinfo(){
        this.$promot({
          name:'errorInfo',
          width:'80%',
          title:'错误提示',
          funCode:'errorInfo',
          props:{
            errs:{
              title:'修改失败',
              desc:'身份证错误'
            },
            isableclose:false,
            b:2
          },
          callback:(close,str)=>{
            close()
          }
        })
      },
      successInfo(){
        this.$promot({
          name:'succesInfo',
          width:'80%',
          title:'正确提示',
          funCode:'succesInfo',
          props:{
            ttext:'修改成功',
            isableclose:true,

          },
          callback:(close,str)=>{
            close()
          }
        })
      },
      opencard(){

        this.$card({
          name:'cardAndPromot',
          width:'80%',
          title:'基本信息',
          funCode:'cardAndPromot',
          props:{
            a:1,
            b:2
          },
          callback:(close,str)=>{
            close()
          }
        })

      },
      openpromot(){
        this.$promot({
          name:'$promot',
          width:'80%',
          title:'基本信息',
          funCode:'qyts',
          props:{
            a:1,
            isableclose:true,
            tipText:'请签约合同',
            b:2
          },
          callback:(close)=>{
            close()
          }
        })

      },
      openpromot2(){
        this.$promot({
          name:'$promot',
          width:'80%',
          title:'修改公司',
          funCode:'modifyCom',
          props:{
            isableclose:true,
            comName:''

          },
          callback:(close,str)=>{
            close()
            alert(str)
          }
        })

      }
    }
  }
</script>

<style scoped>

</style>
