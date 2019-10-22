<template>
  <div class="mycon">
    <!--<div class="contypes">-->
    <!--&lt;!&ndash;<div class="tabc">&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="curent">已签约</div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div>未签约</div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->

    <!--</div>-->
    <div class="conlist">
      <ul>
        <!--v-show="conlist.length == 0"-->
        <div v-show="conlist.length == 0" class="nocon">
          <img src="../../assets/img/nohetong.png"/>
          <br>
          暂无合同
        </div>
        <template v-for="d,index in  conlist">
          <div v-if="d.length>0" class="comtitle">
            {{d[0].company_name}}
          </div>
          <li v-for="c,idx in d">
            <div class="coninfo">
              <div class="iteminfo">
                <p class="jtitle">签约时间:{{c.start_at}}</p>
                <h3>{{c.company_name}}/{{c.member_contract_str}}</h3>
                <p class="timer" v-show="c.sign_status == 1">合同编号:{{c.contracts}}</p>
              </div>
              <div class="iteminfobtn" v-if="c.sign_status == 1">
                <a class="main sm" target="_blank" :href="burl+'mapi/getContract/'+c.contracts">查看合同</a>
              </div>

              <div class="iteminfobtn" v-if="c.sign_status == 0">
                <a class="main sm" target="_blank" @click="goqianyue(c)">立即签约</a>
              </div>

            </div>
            <div class="contractState" v-show="c.sign_status == 0"><img src="../../assets/img/c_wgq.png"/></div>
            <div class="contractState" v-show="c.sign_status == 1"><img src="../../assets/img/c_yqy.png"/></div>
          </li>
        </template>


        <!--<li>-->
        <!--<div class="coninfo">-->
        <!--<div class="iteminfo">-->
        <!--<p class="jtitle">sdsdfdfsfddsfdfsfd</p>-->
        <!--<h3>合同名称合同名称合同名称合同名称合同名称合同名称</h3>-->
        <!--<p class="timer">230230932902390</p>-->
        <!--</div>-->
        <!--<div class="iteminfobtn">-->
        <!--<button class="main sm trans">立即续签</button>-->
        <!--</div>-->

        <!--</div>-->
        <!--<div class="contractState"><img src="../../assets/img/c_ygq.png"/> </div>-->
        <!--</li>-->
        <!--<li>-->
        <!--<div class="coninfo">-->
        <!--<div class="iteminfo">-->
        <!--<p class="jtitle">sdsdfdfsfddsfdfsfd</p>-->
        <!--<h3>合同名称合同名称合同名称合同名称合同名称合同名称</h3>-->
        <!--<p class="timer">230230932902390</p>-->
        <!--</div>-->
        <!--<div class="iteminfobtn">-->
        <!--<button class="main sm trans">立即续签</button>-->
        <!--</div>-->

        <!--</div>-->
        <!--<div class="errin">-->
        <!--这里展示审核失败原因！！这里展示审核失败原因这里展示审核失败原因-->
        <!--</div>-->
        <!--<div class="contractState"><img src="../../assets/img/c_sb.png"/> </div>-->
        <!--</li>-->

      </ul>
    </div>
  </div>
</template>

<script>
  import {XIEYI_URL} from '@/constants'

  export default {
    name: 'my-contract',
    data () {
      return {
        conlist: [],
        pdf: '',
        burl: ''
      }
    },
    created () {
      this.getcon()
      this.burl = XIEYI_URL
    },
    methods: {
      goqianyue (obj) {
        // alert(obj.company_id)
        if (obj.role_id == 1) {//用工宝
          var setp = localStorage.getItem('teamAuth' + obj.company_id)
          this.$router.push({
            path: '/authPerson',
            query: {
              funCode: 'teamAuth',
              setp: setp == null ? 2 : setp,
              cid: obj.company_id
            }
          })

        }
        if (obj.role_id == 2) {//创业宝
          var setp = localStorage.getItem('businessAuth' + obj.company_id)
          this.$router.push({
            path: '/authPerson',
            query: {
              funCode: 'businessAuth',
              setp: setp == null ? 1 : setp,
              cid: obj.company_id
            }
          })

        }
        if(obj.role_id == 3) {//分工宝
          var setp = localStorage.getItem('personalAuth' + obj.company_id)
          this.$router.push({
            path: '/authPerson',
            query: {
              funCode: 'personalAuth',
              setp: setp == null ? 2 : setp,
              cid: obj.company_id
            }
          })
        }

      },
      // viewpdf(obj){
      //   var x = XIEYI_URL+'mapi/getContract/'+obj.contracts
      //
      //   location.href = ;
      //   return false;
      //
      // },
      getcon () {
        this.request.post('mapi/showContracts').then(res => {
          this.conlist = res.data
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comtitle {
    color: #999;
  }

  .contypes {
    text-align: center;
    padding: 20px;

    .tabc {
      display: inline-block;
      margin: 0 auto;
      border-radius: 10px;
      overflow: hidden;

      div {
        display: flex;
        background: #FFF;
        padding: 10px 20px;
        text-align: center;
        display: inline-block;

      }

      .curent {
        background: #fa4412;
        color: #FFF;
      }
    }
  }

  .nocon {
    padding: 30px;
    padding-top: 50%;

    img {
      width: 30%;
    }

    text-align: center;
    color: #999;
  }

  .coninfo {
    position: relative;
    z-index: 9;
  }

  .mycon {
    height: 100%;
    background: #F6F6F6;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;

    .conlist {
      ul {
        padding: 20px 30px;

        li {
          .contractState {
            position: absolute;
            left: 45%;
            opacity: .5;
            z-index: 1;
            top: 10%;
            height: 220px;

            img {
              height: 80%;
            }
          }

          .errin {
            padding: 20px 50px 30px 50px;
            color: red;
            box-shadow: inset 0px 35px 20px -15px rgba(255, 96, 55, .1);

          }

          margin: 20px 0;
          background: #FFF;
          border-radius: 30px;
          box-shadow: 0 0 30px rgba(119, 119, 119, .1);
          min-height: 180px;
          position: relative;

          .iteminfo {
            padding: 30px 50px;
            padding-bottom: 20px;

            h3 {
              font-weight: normal;
              font-size: 30px;
              padding: 20px 0;
              padding-right: 250px;
            }

            .jtitle {
              color: #999;

            }

            .timer {
              color: #999;
              text-align: right;
              padding-bottom: 10px;
            }
          }

          .iteminfobtn {
            position: absolute;
            width: 180px;
            top: 80px;
            right: 20px;
          }

        }
      }
    }
  }
</style>
