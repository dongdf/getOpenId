<template>
  <elem v-if="funCode" :configs="funCode"></elem>
</template>

<script>
  import './router.js'

  export default {
    name: "index",
    data(){
      return{
        funCode:''
      }
    },
    created(){
      if(this.$route.query.funCode){
        this.funCode = this.$route.query.funCode
        // alert(this.funCode)
      }
    }
  }
</script>

<style scoped>

</style>
