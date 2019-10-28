<template>
  <div class="qytscontent">
    <div class="title"><img src="../../assets/img/errorIcon.png"><span>错误</span></div>
    <p>{{tipText}}</p>
    <div class="qbtn">
      <span @click="callback()">重新上传</span>
    </div>
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

    p {
      font-weight: bold;
      padding: 40px 0 40px 0;
      position: relative;
    }

    img {
      width: 60px;
      height: 60px;
      vertical-align: middle;
    }

    .title span {
      font-size: 37px;
      font-weight: bold;
      color: #FF5B2C;
      padding-left: 10px;
      vertical-align: middle;
    }
  }
</style>
