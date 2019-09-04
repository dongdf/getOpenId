<template>
<div class="page">
  <ul class="list-ul">
    <li class="error clearfix">
      <div class="fl title">
        <p class="en-word">SFSFSFSFSFFSDGFH</p>
        <p>公司名+合同名称</p>
      </div>
      <div class="fl bthtime">
        <a href="">立即签约</a>
        <p class="en-word">2019202-20202323</p>
      </div>
    </li>
    <li class="clearfix">
      <div class="fl title">
        <p class="en-word">SFSFSFSFSFFSDGFH</p>
        <p>公司名+合同名称</p>
      </div>
      <div class="fl bthtime">
        <a href="">立即签约</a>
        <p class="en-word">2019202-20202323</p>
      </div>
    </li>
    <li class="clearfix">
      <div class="fl title">
        <p class="en-word">SFSFSFSFSFFSDGFH</p>
        <p>公司名+合同名称</p>
      </div>
      <div class="fl bthtime">
        <a href="">立即签约</a>
        <p class="en-word">2019202-20202323</p>
      </div>
    </li>
    <li class="clearfix">
      <div class="fl title">
        <p class="en-word">SFSFSFSFSFFSDGFH</p>
        <p>公司名+合同名称</p>
      </div>
      <div class="fl bthtime">
        <a href="">立即签约</a>
        <p class="en-word">2019202-20202323</p>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
  export default {
    name: "contractname-list"
  }
</script>

<style lang="scss" scoped>
  .page{
    background:#f5f5f5;box-sizing:border-box;padding-top:20px;height:100%;
  }
.list-ul{
  width:94%;margin:0 auto;
  li{width:100%;background:#fff;height:170px;border-radius: 20px;margin-bottom:20px;box-sizing: border-box;padding:30px 10px;
    .title{
      width:60%;

    }
    p{line-height: 50px;}
    .en-word{color:#D3D3D3}
    .bthtime{width:40%;text-align: right;
      a{width:60%;height:40px;border-radius:16px;background:#ff7755;color:#fff;display: inline-block;text-align: center;line-height: 40px;margin-top:10px;}
      .en-word{font-size:20px;}
    }

  }
  .error{
    background:url("../../assets/img/errorIcon.jpg")no-repeat center #fff;background-size:auto 100%;
  }

}

</style>
