<template>
  <elem v-if="funCode" :configs="funCode"></elem>
</template>

<script>
  import './router.js'
  import '../comminfo/router.js'
  import '../mine/router.js'

  export default {
    name: 'index',
    data () {
      return {
        funCode: ''
      }
    },
    created () {
      if (this.$route.query.funCode) {
        this.funCode = this.$route.query.funCode
      }
    }
  }
</script>

<style scoped>

</style>
