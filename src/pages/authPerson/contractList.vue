<template>
   <div>
     <div class="contractBar">

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
  .contractBar{
    height:80px;
    background:black;

  }

  .contContent{
    position:absolute;
    bottom:190px;
    top:150px;left:0;right:0;

    background: red;
    .contractFrame{
      position: relative;
      width:100%;
      height: 100%;
    }

  }
</style>
