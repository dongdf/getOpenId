<template>
    <div style="text-align: center;padding:20px;">
      动态加载组件<br>

      <mt-button type="default" size="large">default</mt-button>
      <br>
      <mt-button type="primary" size="large" @click.native="opencard">加载右侧</mt-button>
      <br>
      <mt-button type="danger" size="large" @click.native="openpromot">弹出内容</mt-button>



      <!--<button @click="opencard">加载左侧opencard</button>-->
      <!---->
      <!--<button >弹出内容</button>-->
    </div>
</template>

<script>
  export default {
    name: "fun",
    methods:{
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
          funCode:'cardAndPromot',
          props:{
            a:1,
            b:2
          },
          callback:(close)=>{
            close()
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
