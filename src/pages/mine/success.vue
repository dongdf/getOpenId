<template>
  <div class="qytscontent">
    <div class="qbtn">
      <img src="../../assets/img/successIcon.jpg">
    </div>
    <p>{{tipText}}</p>
    <p>3s后自动关闭</p>
  </div>
</template>

<script>
  export default {
    props: ['ableClose', 'tipText'],
    name: 'qyts',
    created () {
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .qytscontent {
    text-align: center;
    margin: 0 auto;
    position: relative;

    p {
      font-size: 35px;
      padding: 0px 0 20px 0;
      position: relative;
      top: -20px;
    }

    img {
      width: 120px;
      height: 120px;
    }

    .qtbn {
      top:-50px;
      left: 0;
      text-align: center;
      position: relative;
      width: 100%;
    }
  }
</style>
