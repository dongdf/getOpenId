<template>
    <div class="mbginfo">
      <div class="headertop">
      <div class="pinfoheader">
        <img class="bgimg" src="../../assets/img/pbanner1.jpg"/>
        <div class="pinfoContent">
           <div class="headerimg">
             <img  src="../../assets/img/uploadDemo.png"/>
           </div>
           <div class="headerinfos">
             <h3>刘志军<span>未签约</span></h3>
             <p>江苏神州易桥财税科技有限公司</p>
           </div>
        </div>
      </div>
      <div class="quickinfo">

        <div class="quickItem">
          <h3>3,000</h3>
          <p>钱包(元)</p>
        </div>
        <div class="quickItem">
          <div class="lines"></div>
          <h3>4,000</h3>
          <p>积分(UHRB)</p>
        </div>
        <div class="quickItem">
          <div class="lines"></div>
          <h3>3</h3>
          <p>合同</p>
        </div>

      </div>

      <div class="quickicon">
        <div class="quickiconItem">
          <div class="iconimg"><img  src="../../assets/img/picon1_1.jpg"/></div>
          <p>优享+</p>
        </div>
        <div class="quickiconItem">
          <div class="iconimg"><img  src="../../assets/img/picon1_2.jpg"/></div>
          <p>体检订单</p>
        </div>
        <div class="quickiconItem">
          <div class="iconimg"><img  src="../../assets/img/picon1_3.jpg"/></div>
          <p>个体工商户</p>
        </div>
        <div class="quickiconItem">
          <div class="iconimg"><img  src="../../assets/img/picon1_4.jpg"/></div>
          <p>业务外包</p>
        </div>
      </div>
      </div>
      <div class="mlists">
        <ul>
          <li>
            <div class="lname">我的工作</div>
            <div class="lbq"><span>3988</span><i class="aright"><img src="../../assets/img/arrowRight.jpg"/> </i></div>
          </li>
          <li>
            <div class="lname">我的工资条</div>
            <div class="lbq"><i class="aright"><img src="../../assets/img/arrowRight.jpg"/> </i></div>
          </li>
        </ul>

        <ul>
          <li>
            <div class="lname">我的个体工商执照</div>
            <div class="lbq"><i class="aright"><img src="../../assets/img/arrowRight.jpg"/> </i></div>
          </li>
          <li>
            <div class="lname">我的业务承揽</div>
            <div class="lbq"><i class="aright"><img src="../../assets/img/arrowRight.jpg"/> </i></div>
          </li>
          <li>
            <div class="lname">我的佣金</div>
            <div class="lbq"><i class="aright"><img src="../../assets/img/arrowRight.jpg"/> </i></div>
          </li>
          <li>
            <div class="lname">我的发票</div>
            <div class="lbq"><i class="aright"><img src="../../assets/img/arrowRight.jpg"/> </i></div>
          </li>
        </ul>
        <ul>

          <li>
            <div class="lname">我的业务承揽</div>
            <div class="lbq"><i class="aright"><img src="../../assets/img/arrowRight.jpg"/> </i></div>
          </li>
          <li>
            <div class="lname">我的佣金</div>
            <div class="lbq"><i class="aright"><img src="../../assets/img/arrowRight.jpg"/> </i></div>
          </li>
          <li>
            <div class="lname">我的发票</div>
            <div class="lbq"><i class="aright"><img src="../../assets/img/arrowRight.jpg"/> </i></div>
          </li>
        </ul>


      </div>
    </div>
</template>

<script>
  export default {
    name: "minfo"
  }
</script>

<style lang="scss" scoped>
  .mbginfo{
    background: #FFF;
    position:relative;
    height:100%;
  }
  .mlists{
    padding-top:30px;
    ul{
      padding:0 30px;
      padding-left: 40px;
      li{
        border-bottom: 1px solid #EEE;
        display: flex;
        padding:25px 0;
        position: relative;


        .lname{
          width:100%;
          font-size:30px;

        }
        .lbq{

          text-align: right;
          padding-right:60px;
          span{
            background: red;
            padding:2px 15px;
            color:#FFF;
            border-radius:20px;
          }
          .aright{
            width:40px;
            position: absolute;
            top:15px;
            right:10px;
            img{width:100%}
          }
        }
      }
    }
  }

  .quickinfo{
    display: flex;
    padding-top:10px;
    .quickItem{
      position: relative;
      .lines{
        position: absolute;
        width:2px;
        height:100%;
        top:0;left:0;
        background: #EEE;
      }
      text-align: center;
      width:100%;
      h3{
        font-size:45px;
      }
      p{
        color:#999;
      }
    }
  }
  .headertop{
    box-shadow: 0 5px 50px rgba(0,0,0,.1);
    background: #FFF;
    padding-bottom: 20px;
  }
  .quickicon{
    margin-top:40px;

    padding-top:20px;
    border-top: 1px solid #EEE;
    display: flex;
    .quickiconItem{
      width:100%;
      text-align: center;
      .iconimg{width:100px;margin:0 auto; img{width:100%;}}
      p{
        color:#333;
      }

    }
  }

  .pinfoheader{
    position:relative;
    .bgimg{width:100%}
    .pinfoContent{
      position: absolute;

      top:48px;left:58px;
      right:0;
      bottom:0;
      z-index: 9;
      display: flex;
      .headerimg{
        width:120px;height:120px;
        border-radius: 1000px;
        overflow: hidden;

        img{width:100%; height: 100%;}
      }
      .headerinfos{
        padding-left:10px;
        padding-top:15px;
        color:#FFF;
        h3{font-size:35px;
          span{font-size:25px;
           background: rgba(255,255,255,.3);
            position: relative;
            left:10px; top:-3px;
            padding:4px 10px;
            border-radius: 50px;
            color:#FFF;
          }
        }

      }
    }
  }
</style>
