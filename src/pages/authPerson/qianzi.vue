<template>
  <mt-popup v-model="showQz"   position="bottom" class="mint-popup-3" :modal="true">

    <div>签字</div>
  </mt-popup>
</template>

<script>
  export default {
    props:['showQz'],
    name: "qianzi"
  }
</script>

<style scoped>

</style>
