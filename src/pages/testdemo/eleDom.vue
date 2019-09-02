<template>
  <div>第二次
    <div style="height:300px;position: relative;background: red">
      {{imgs}}
      <wxupload @upinfo="upinfozm"></wxupload>
    </div>

  </div>
</template>

<script>
  export default {
    name: "ele-dom",
    data(){
      return{
        imgs:[]
      }
    },
    methods:{
      upinfozm(str){
        alert(str)
      }
    }
  }
</script>

<style scoped>

</style>
