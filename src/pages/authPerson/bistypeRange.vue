<template>
    <div class="rangecontent">
      <div class="cmrange">
        <!--<h3>-->
          <!--请选择经营范围-->
          <!--<p><i><img src="../../assets/img/infoicon1.jpg"/> </i><span>最多选择三个,灰色为必选不可更改</span></p>-->
        <!--</h3>-->
        <ul>

          <li class="">商务信息咨询服务部/商务信息咨询工作室
            <label class="checkbox"></label>
          </li>
          <li class="">商务信息咨询服务部/商务信息咨询工作室
            <label class="checkbox"></label>
          </li>
          <li class="">商务信息咨询服务部/商务信息咨询工作室
            <label class="checkbox"></label>
          </li>
          <li class="">商务信息咨询服务部/商务信息咨询工作室
            <label class="checkbox"></label>
          </li>
          <li class="">商务信息咨询服务部/商务信息咨询工作室
            <label class="checkbox checkboxed"></label>
          </li>

        </ul>
      </div>
      <!--<div class="bsave">-->
        <!--<button class="main" @click="conrange()">保存</button>-->
      <!--</div>-->
    </div>

</template>

<script>
  export default {
    name: "bis-range",
    methods:{
      conrange(){
        this.callback()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bsave{
    position: absolute;
    bottom:70px;
    left:20%;
    right: 20%;

  }
  .rangecontent{
    position: relative;
    height:100%;
  }

  .cmrange{
    position: absolute;

    top:0;
    left:0;
    right:-20px;
    padding:50px 40px;
    overflow: auto;
    overflow-x: hidden;
    h3{
      font-size:35px;
      font-weight: normal;
      p{
        color:#999;
        font-size:25px;
        i{display: inline-block;width:40px;img{width:100%;}}
        span{
          position: relative;
          top:-10px;
        }
      }
    }
    ul{
      padding-top:40px;
      li{
        position: relative;
        padding:20px 0;
        border-bottom: 1px solid #EEE;
        padding-right:60px;

        .checkbox{
          position: absolute;
          width:60px;height:60px;
          top:0;right:-20px;
          background:url("../../assets/img/checkboxed.jpg") no-repeat center;
          background-size: 100%;

        }.checkboxed{
           position: absolute;
           background:url("../../assets/img/checkbox.jpg") no-repeat center;
           background-size: 100%;
         }


      }
      li.dis{
        color:#999;
      }
    }
  }
</style>
