<template>
  <div class="mycon">
    <div class="conlist">
      <ul>
        <div v-show="conlist.length == 0" class="nocon">
          <img src="../../assets/img/nohetong.png"/>
          <br>
          暂无合同
        </div>
        <div v-for="d in conlist" v-bind:key="d.id">
          <div v-if="d.length>0" class="comtitle">
            {{d[0].company_name}}
          </div>
          <li v-for="c in d" v-bind:key="c.id">
            <div class="coninfo">
              <div class="iteminfo">
                <p class="jtitle">签约时间:{{c.start_at?c.start_at.substr(0,10):c.start_at}}</p>
                <h3>{{c.company_name}}/{{c.member_contract_str}}</h3>
                <p class="timer" v-show="c.sign_status == 1">编号:{{c.contracts}}</p>
              </div>
              <div class="iteminfobtn" v-if="c.sign_status == 1">
                <a class="main sm" target="_blank" :href="burl+'mapi/getContract/'+c.contracts">查看合同</a>
              </div>
              <div class="iteminfobtn" v-if="c.sign_status == 0||c.video_status == 3">
                <a class="main sm" target="_blank" @click="goqianyue(c)">立即签约</a>
              </div>
            </div>
            <div class="contractState" v-show="c.sign_status == 0"><img src="../../assets/img/c_wgq.png"/></div>
            <div class="contractState" v-show="c.sign_status == 1&&c.video_status!= 3"><img
              src="../../assets/img/c_yqy.png"/></div>
            <div class="contractState" v-show="c.sign_status == 1&&c.video_status == 3"><img
              src="../../assets/img/c_sb.png"/></div>
          </li>
        </div>
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
      /**
       * 立即签约
       * @param obj
       */
      goqianyue (obj) {
        // 用工宝
        if (obj.role_id === 1) {
          let setp = localStorage.getItem('teamAuth' + obj.company_id)
          this.$router.push({
            path: '/authPerson',
            query: {
              funCode: 'teamAuth',
              setp: setp == null ? 2 : setp,
              cid: obj.company_id
            }
          })
        }
        // 创业宝
        if (obj.role_id === 2) {
          // 创业宝--芜湖
          let setp1 = localStorage.getItem('businessAuth' + obj.company_id)
          // 创业宝--宿迁
          let setp2 = localStorage.getItem('suqianAuth' + obj.company_id)
          let flag = obj.role_address
          if (obj.role_id === 2 && flag === '宿迁') {
            if (obj.video_status === 3) {
              setp2 = 1
            }
            this.$router.push({
              path: '/authPerson',
              query: {
                funCode: 'suqianAuth',
                setp: setp2 == null ? 1 : setp2,
                cid: obj.company_id
              }
            })
          } else {
            this.$router.push({
              path: '/authPerson',
              query: {
                funCode: 'businessAuth',
                setp: setp1 == null ? 1 : setp1,
                cid: obj.company_id
              }
            })
          }
        }
        // 分工宝
        if (obj.role_id === 3) {
          let setp = localStorage.getItem('personalAuth' + obj.company_id)
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
