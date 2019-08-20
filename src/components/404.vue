<template>
  <div id="not-found-page">
  	<h1>404</h1>
    <p>Not Found</p>
  </div>
</template>
<script>
  export default {
    mounted(){
      this.$router.push({path:'/'});
    }
  }
</script>
