<template>
<div>
  <div class="seltitle">
    <h3>请选择公司</h3>
    <p>以便为您提供更精确的服务</p>
  </div>
  <div class="companyList">
    <ul>
      <li class="actives">北京位置微云北京位置微云北京位置微云北京位置微云<label class="ckbox ckboxed"></label></li>
      <li>北京位置微云北京位置微云北京位置微云北京位置微云<label class="ckbox"></label></li>
      <li>北京位置微云北京位置微云北京位置微云北京位置微云<label class="ckbox"></label></li>
      <li>北京位置微云北京位置微云北京位置微云北京位置微云<label class="ckbox"></label></li>
    </ul>
  </div>

</div>
</template>

<script>
  export default {
    name: "select-company"
  }
</script>

<style lang="scss" scoped>
  .seltitle{
    padding:40px;
    h3{font-size:35px;}
    p{color:#999;}

    padding-bottom: 0;
    padding-top:100px;
  }
  .companyList{
    ul{
      padding:40px;
      padding-top:0;
      li{
        position: relative;
        padding: 30px;
        border-radius: 20px;
        padding-right:80px;
        font-size:30px;

        .ckbox{
          position: absolute;
          width:80px;
          height: 80px;

          display: block;
          right:-20px;top:10px;
          background: url("../../assets/img/checkboxed.jpg") no-repeat center;
          background-size:100% auto;
        }
        .ckboxed{
          background: url("../../assets/img/checkbox.jpg") no-repeat center;
          background-size:100% auto;
        }
        margin:40px 0;
      }
      li:nth-child(odd){background:linear-gradient(to right,#FFCCBD,#FFF);}
      li:nth-child(even){background:linear-gradient(to right,#C2E6FD,#FFF);}
      .actives{
        box-shadow: 0 2px 20px rgba(0,0,0,.2);
      }
    }

  }

</style>
