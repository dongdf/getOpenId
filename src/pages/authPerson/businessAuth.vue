<template>
  <div>
    <div class="forgetSetp breakfour">
      <ul class="clearfix">
        <li class="leftli active "><a href=""><i>1</i><span>上传截图</span></a></li>
        <li class="leftli " :class="setpidx>=2?'active':''"><a href=""><i>2</i><span>完善信息</span></a></li>
        <li class="leftli " :class="setpidx>=3?'active':''"><a href=""><i>3</i><span>确认信息</span></a></li>
        <li class="" :class="setpidx>=4?'active':''"><a href=""><i>4</i><span>签约</span></a></li>

      </ul>
    </div>
    <div v-show="setpidx == 1">
      <div class="aucontent">
        <ul>

          <li v-if="upimgzm.length>0">
            <img :src="upimgzm[0]"/>
            <span class="delicon" @click="delimgzm()">删除</span></li>
          <li v-else @click="upimgadd"><img src="../../assets/img/bsiup.jpg"/>
            <wxupload ref="gsup" @upinfo="upinfozm"></wxupload>
          </li>


        </ul>

      </div>


      <div class="subc">
        <button @click="gonext(2)" class="main">下一步</button>
      </div>
      <div class="auDemo">
        <img v-if="!myphones" src="https://renshe.oss-cn-beijing.aliyuncs.com/miniProgram/androidtips.jpg"/>
        <img v-if="myphones" src="https://renshe.oss-cn-beijing.aliyuncs.com/miniProgram/iostips.jpg"/>
      </div>
    </div>

    <div v-show="setpidx == 2">
      <div class="busContent">
        <ul>

          <li class="fileTitle">基本信息</li>
          <li>
            <div class="filelabel">姓名</div>
            <div class="filecontent" style="color:#666;">
              <!--<input v-model="curInfo.name"  type="text" style="text-align: right" placeholder="请输入姓名"/>-->
              {{curInfo.name}}
            </div>
          </li>
          <li>
            <div class="filelabel">性别</div>
            <div class="filecontent" style="color:#666;">
              <span>{{curInfo.sex_str}}</span>
              <!--<div class="resext">-->
              <!--<label><i class="ichecked"></i>男</label>-->
              <!--<label><i></i>女</label>-->
              <!--</div>-->
            </div>
          </li>
          <li>
            <div class="filelabel">身份证</div>
            <div class="filecontent" style="color:#666;">
              {{curInfo.id_card}}
              <!--<input v-model="curInfo.id_card"  type="text" style="text-align: right" placeholder="请输入身份证"/>-->
            </div>
          </li>
          <li>
            <div class="filelabel">生日</div>
            <div class="filecontent" style="color:#666;">{{curInfo.birthday}}</div>
          </li>
          <li>
            <div class="filelabel">户籍所在地</div>
            <div class="filecontent" style="color:#666;">
              {{curInfo.address}}
              <!--<input v-model="curInfo.registration"  type="text" style="text-align: right" placeholder="请输入户籍所在地"/>-->
            </div>
          </li>
          <li>
            <div class="filelabel">身份证</div>
            <div class="filecontent" style="color:#00B12E" @click="viewIdcard">
              <span>已上传<i class="rightas"><img src="../../assets/img/righta.jpg"/> </i></span>
            </div>
          </li>

          <li class="fileTitle">其它信息</li>

          <li>
            <div class="filelabel">手机号</div>
            <div class="filecontent" style="color:#666;">
              {{curInfo.phone}}
              <!--<input v-model="curInfo.phone"  type="number" style="text-align: right" placeholder="请输入手机号"/>-->
              <!--<input v-model="curInfo.phone"  type="number" style="text-align: right" placeholder="请输入手机号"/>-->
            </div>
          </li>
          <li>
            <div class="filelabel">银行开卡号</div>
            <div class="filecontent">
              {{curInfo.bank_account}}
              <!--<input v-model="curInfo.bank_account"  class="nostyle"  type="text" style="text-align: right" placeholder="请输入银行开卡号"/>-->
            </div>
          </li>
          <li>
            <div class="filelabel">银行卡开户地址</div>
            <div class="filecontent" @click="areaShow = true">{{areaselectname?areaselectname:'请选择'}}<i class="rightas"><img
              src="../../assets/img/righta.jpg"/> </i></div>
          </li>
          <li>
            <div class="filelabel">银行卡开户行</div>
            <div class="filecontent">
              {{curInfo.bank_name}}
              <!--<input v-model="curInfo.bank_name" class="nostyle"  type="text" style="text-align: right" placeholder="请输入银行卡开户行"/>-->
            </div>
          </li>
          <!--<li>-->
          <!--<div class="filelabel">现居住地址</div>-->
          <!--<div class="filecontent">-->
          <!--<input v-model="curInfo.address" class="nostyle"  type="text" style="text-align: right" placeholder="请输入现居住地址"/>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li>-->
          <!--<div class="filelabel">工种</div>-->
          <!--<div class="filecontent">-->
          <!--<input v-model="curInfo.work_type" class="nostyle"  type="text" style="text-align: right" placeholder="请输入工种"/>-->
          <!--</div>-->
          <!--</li>-->


          <!--<li>-->
          <!--<div class="filelabel">学历</div>-->
          <!--<div class="filecontent">-->
          <!--<span @click="selectXl()">{{curInfo.education?curInfo.education:'初中'}}<i class="rightas"><img src="../../assets/img/righta.jpg"/> </i></span>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li>-->
          <!--<div class="filelabel">每小时工资</div>-->
          <!--<div class="filecontent" style="color:#666;"  >￥20</div>-->
          <!--</li>-->
          <!--<li>-->
          <!--<div class="filelabel">工种</div>-->
          <!--<div class="filecontent">初中，小学，默认初中</div>-->
          <!--</li>-->


        </ul>
      </div>

      <div class="subc">
        <button @click="gonext(3)" class="main">提交</button>
      </div>
    </div>
    <div v-show="setpidx == 3">
      <div class="chooseMain">
        <ul>
          <li @click="openrangetype">
            <h3>个体工商户类型</h3>
            <p v-if="!confirmType.id">请选择个体工商户类型</p>
            <p v-else="confirmType.id">{{confirmType.name}}</p>

          </li>

          <li>
            <h3>经营范围</h3>
            <!--<p @click="openrange()">请选择个体工商户类型</p>-->
            <div class="comrange">
              <ul>
                <!--<li class="dis">经营范经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围围</li>-->
                <li class="dis">网上从事：化工产品市场推广服务、企业形象策划服务
                  市场营销策划服务、保健用品市场推广服务
                  室内设计及市场推广服务、陶瓷产品市场推广服务
                  系统安装服务、软件、信息技术、电子产品
                  机械设备领域内的技术开发、技术咨询、技术服务
                  技术转让服务、计算机软件开发、维护
                  信息咨询服务、信息咨询，财务信息咨询
                  电子商务信息咨询、房产信息咨询、互联网信息咨询
                  电商信息咨询推广服务、知识产权相关信息咨询
                  工程造价信息咨询、企业管理咨询、劳务信息咨询
                  电脑图文设计制作、多媒体技术开发服务
                  网页设计（涉及前置审批的除外）
                </li>
                <!--<li>经营范经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围经营范围围</li>-->
              </ul>
            </div>
          </li>


          <li style="border:none;" v-show="mynamelist">
            <h3>个体申请名称</h3>
            <ul class="rangnamelist">
              <li v-for="(k,index) in mynamelist">{{k}}<label @click="editcomName(k,index)" class="eidtname"><img
                src="../../assets/img/edit.jpg"/> </label></li>
            </ul>
          </li>
          <button class="main" @click="gonext(4)">确认注册信息,开始签约</button>
        </ul>

      </div>

    </div>
    <div v-show="setpidx == 4">
      <elem configs="contractList" v-if="!isqz"></elem>
      <div class="tx">
        <button class="main" @click="isqz = true">一键签约({{cnumb}})</button>
        <!--<div class="xieyi"><span class="ckbox"><img src="../../assets/img/checkbox.jpg"/> </span>我已阅读并同意非全制度</div>-->
      </div>
    </div>

    <elem :showQz="isqz" :qname="curInfo.name" configs="qianzi"></elem>
    <areas :pickerShow="areaShow" @areaok="areaOk" @areacancle="areaCancle"></areas>

  </div>
</template>

<script>
  import {IMG_URL} from '@/constants'
  import pickeritem from '../../components/pickercustom/picker'
  import areas from '../../components//area/chsArea'
  import {XIEYI_URL} from '@/constants'

  export default {
    name: 'businessAuth',
    components: {pickeritem, areas},
    data () {
      return {
        mynamelist: '',
        isqz: false,
        setpidx: 1,
        curInfo: {},
        upimgzm: [],
        confirmType: {},
        timer: 10,
        timerText: '获取验证码',
        codeSending: true,
        phone: '',
        phoneCode: '',
        myphones: false,
        areaselectname: '',
        selectAreaInfo: {},
        cnumb: 0,
        areaShow: false,

      }
    },
    created () {
      this.setpidx = this.$route.query.setp ? this.$route.query.setp : 1
      var u = navigator.userAgent
      if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
        this.myphones = true
      } else {
        this.myphones = false
      }

      if (this.$route.query.cid) {
        this.getCurinfo(this.$route.query.cid)
      }

      setTimeout(() => {
        this.cnumb = window.connumb
      }, 500)
    },
    methods: {
      areaOk (areaObj) {
        console.log(JSON.stringify(areaObj))
        this.areaShow = false
        this.areaselectname = areaObj.province.name + '/' + areaObj.city.name + '/' + areaObj.county.name
        this.selectAreaInfo = areaObj
      },
      areaCancle () {
        this.areaShow = false
      },
      viewIdcard () {
        // this.$card({
        //   funCode:'idcardview',
        //   width:'90%',
        //   title:'身份证预览',
        //   props:{
        //     cardinfo:this.curInfo
        //   }
        // })
        this.$router.push({
          path: '/authPerson',
          query: {
            funCode: 'idcardview',
            zidimg: this.curInfo.zidimg,
            fidimg: this.curInfo.fidimg
          }
        })
      },
      getCurinfo (id) {
        this.request.post('mapi/getOneCompanyInfo', {company_id: id}).then(res => {
          if (res.code == 0) {
            this.curInfo = res.data
            if (res.data.bank_aname) {
              this.areaselectname = res.data.bank_pname + '/' + res.data.bank_cname + '/' + res.data.bank_aname
              this.selectAreaInfo = {
                'province': {
                  'name': res.data.bank_pname,
                  'code': res.data.bank_pid
                },
                'city': {
                  'name': res.data.bank_cname,
                  'code': res.data.bank_cid
                },
                'county': {
                  'name': res.data.bank_aname,
                  'code': res.data.bank_aid
                }
              }
            }

          } else {
            this.$toast(res.msg)

          }

        }, error => {
          this.$messagebox.alert('获取信息失败,点击右上角三个点选择刷新！')
        })
      },
      upimgadd () {
        this.$refs.gsup.chooseImg('')
      },
      closepp () {
        this.isqz = false
      },
      editcomName (k, idx) {
        this.$promot({
          name: '$promot',
          width: '80%',
          title: '修改公司',
          funCode: 'modifyCom',
          props: {
            isableclose: true,
            comName: k

          },
          callback: (close, str) => {
            this.mynamelist[idx] = str
            close()

          }
        })
      },
      openrangetype () {
        this.$card({
          name: 'bistypeRange',
          width: '90%',
          title: '选择类型',
          funCode: 'bistypeRange',
          props: {
            a: 1,
            b: 2
          },
          callback: (close, str) => {
            this.confirmType = str

            close()
            this.getmyname()
          }
        })

      },
      getmyname () {
        this.request.post('mapi/getIndustryPersonName', {
          type: this.confirmType.id,//(个体工商户类型id),
          company_id: this.$route.query.cid
        }).then(res => {
          if (res.code == 0) {
            this.mynamelist = res.data
          } else {
            alert(res.msg)
          }

        }, error => {
          alert('获取失败')
        })
      },
      openrange () {
        this.$card({
          name: 'bisRange',
          width: '90%',
          title: '经营范围选择',
          funCode: 'bisRange',
          props: {
            a: 1,
            b: 2
          },
          callback: (close, str) => {
            // alert(str)
            this.confirmType = str
            close()
          }
        })

      },
      checkThree (obj) {
        return new Promise((reslove, reject) => {

          this.request.post('mapi/checkThree', {
            company_id: this.$route.query.cid,
            name: obj.name,
            bank_account: obj.bank_account,
            bank_name: obj.bank_name,
            id_card: obj.id_card

          }).then(res => {
            if (res.code == 0) {
              reslove()
            } else {
              reject(res.msg)
            }
          }, error => {
            reject('请求失败，请重新提交')
          })
        })
      },
      gonext (str) {
        if (str == 4) {
          if (!this.confirmType.id) {
            this.$toast('请选择个体工商户类型')
          }
          this.mynamelist.type = this.confirmType.id
          this.mynamelist.company_id = this.$route.query.cid
          this.request.post('mapi/saveIndustryInfo', this.mynamelist).then(res => {
            if (res.code == 0) {
              localStorage.setItem('businessAuth' + this.$route.query.cid, str);
              this.$router.push({
                path: '/authPerson',
                query: {
                  funCode: 'businessAuth',
                  setp: str,
                  cid: this.$route.query.cid
                }
              });
            } else {
              alert(res.msg)
            }

          }, error => {
            alert('提交失败，请重试')
          })

        } else if (str == 3) {

          if (!this.selectAreaInfo.county) {
            this.$toast('请选择银行卡开户地址')
            return false
          }
          this.checkThree(this.curInfo).then(cres => {

            var pdata = {
              province_id: this.selectAreaInfo.province.code,
              province: this.selectAreaInfo.province.name,
              city_id: this.selectAreaInfo.city.code,
              city: this.selectAreaInfo.city.name,
              area_id: this.selectAreaInfo.county.code,
              area: this.selectAreaInfo.county.name,
              bank_account: this.curInfo.bank_account,
              bank_name: this.curInfo.bank_name,
              // address:this.curInfo.address?this.curInfo.address:'暂无地址',
              education: this.curInfo.education ? this.curInfo.education : '初中',
              company_id: this.$route.query.cid,
              id: this.curInfo.id,
              hourly_wage: 20,
              // work_type:this.curInfo.work_type?this.curInfo.work_type:'保洁员'
            }
            this.request.post('mapi/saveInfo', pdata).then(res => {
              if (res.code == 0) {
                localStorage.setItem('businessAuth' + this.$route.query.cid, str);
                this.$router.push({
                  path: '/authPerson',
                  query: {
                    funCode: 'businessAuth',
                    cid: this.$route.query.cid,
                    setp: str
                  }
                });
              } else {
                alert(res.msg)
              }

            }, error => {
              alert('请重新保存')
            })

          }, error => {
            alert(error)
          })

        } else if (str == 2) {
          if (this.upimgzm.length == 0) {
            this.$toast('请上传工商截图')
            return false
          } else {
            localStorage.setItem('businessAuth' + this.$route.query.cid, str);
            this.$router.push({
              path: '/authPerson',
              query: {
                funCode: 'businessAuth',
                cid: this.$route.query.cid,
                setp: str
              }
            });
          }
        } else {
          this.$router.push({
            path: '/authPerson',
            query: {
              funCode: 'businessAuth',
              setp: str,
              cid: this.$route.query.cid
            }
          })
        }

      },
      upinfozm (value) {
        // alert(value)
        this.upimgzm.push(IMG_URL + value)
        // alert(IMG_URL+value)
      },

      delimgzm () {
        this.upimgzm.splice(0, 1)
      }

    }
  }
</script>

<style lang="scss" scoped>

  .nostyle {
    border: none;
    outline: none;
    webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
  }

  .rightas {
    display: inline-block;
    width: 40px;
    text-align: center;

    img {
      width: 60%;
      vertical-align: center;
      position: relative;
      top: 0px
    }

    vertical-align: center;
  }

  .tx {
    position: fixed;
    bottom: 20px;
    left: 30px;
    right: 30px;
  }

  .xieyi {
    padding-top: 5px;
    text-align: center;

    .ckbox {
      display: inline-block;
      width: 50px;
      position: relative;
      top: 15px;

      img {
        width: 100%;
      }
    }
  }

  .mline {
    height: 20px;
    background: #F6F6F6;
    clear: both;
  }

  .chooseMain {
    ul {
      padding: 30px 60px;

      li {
        margin-bottom: 50px;
        border-bottom: 1px solid #EEE;
        padding-bottom: 20px;

        h3 {
          font-size: 35px;
          font-weight: normal;
        }

        p {
          color: #999;
          height: 50px;
          line-height: 50px;
          position: relative;
        }

        p:after {
          content: "";
          width: 40px;
          height: 40px;
          position: absolute;
          top: 5px;
          right: 0;
          background: url("../../assets/img/arrowRight.jpg") no-repeat center;
          background-size: 100%;

        }

        .comrange {
          ul {
            padding: 0;

            li.dis {
              background: #F6F6F6;
              color: #666;
            }

            li {
              padding: 15px;
              border-radius: 10px;
              margin-bottom: 10px;
            }
          }

        }

      }
    }

    ul.rangnamelist {
      padding: 0;
      padding-top: 20px;

      li {
        position: relative;

        margin: 0;
        padding: 20px 0;
        padding-right: 70px;

        span {
          color: #FF4A02;
        }

        .eidtname {
          position: absolute;
          width: 60px;
          height: 60px;
          top: 15px;
          right: 0;

          img {
            width: 100%;
          }
        }
      }

    }

  }

  .busContent {

    ul {
      li {

        padding: 20px;
        display: flex;

        .filelabel {
          width: 300px;
          color: #999;

        }

        .filecontent {

          width: 100%;
          text-align: right;
        }

        border-bottom: 1px solid #EEE;

      }

      .fileTitle {

        background: #F7F7F7;
        width: 100%;
        border: none;
      }
    }
  }

  .restinfocontent {
    h3 {
      font-size: 35px;
      color: #FF5F2C;
      font-weight: normal
    }

    .err {
      span {
        background: #FFDDD3;
        color: #FF5F2C;
        display: inline-block;
        padding: 5px 20px;
        border-radius: 20px;
      }
    }
  }

  .compds {
    padding: 30px;

    li {
      list-style: none;
    }
  }

  .resetinfo {
    text-align: center;
  }

  .yzinfo {
    padding: 50px 50px 0 50px;

    h3 {
      font-size: 35px;

    }

    p {
      color: #999;
    }
  }

  .subc {
    padding: 30px;
  }

  .ptips {
    text-align: center;
    padding-top: 50px;

    span {
      font-size: 30px;
      color: #FF4A02;
    }

    font-size: 30px;

    p {
      color: #999;
      font-size: 25px;
    }
  }


  .itmess {
    background: #FF4A02;
  }


  .findpas {
    text-align: center;
    color: #999;
  }

  .loginicon {
    width: 70px;

    img {
      width: 100%;
    }
  }

  .login {
    .loginb {
      img {
        width: 100%;
      }
    }

    .loginbox {
      padding: 20px;
      background: #FFF;

      li {
        margin: 55px 20px;
        padding: 10px;
        border-bottom: 1px solid #eee;

        input[type='text'] {
          width: 100%;
          border: none;
        }

        display: flex;

        .phonecode {
          width: 30%;
          line-height: 200%;

          span {
            display: block;
            text-align: center;
            color: #FF4A02
          }
        }

      }

      .libtn {
        border: none;

        button {
          padding: 20px;
          border-radius: 100px;
          border: none;
          background: #FF4A02;
          color: #FFF;
          font-size: 35px;
          box-shadow: 0 10px 20px rgba(255, 74, 2, .3);
          width: 100%;
        }
      }
    }
  }

  .libtn {
    border: none;

    button {
      padding: 20px;
      border-radius: 100px;
      border: none;
      background: #FF4A02;
      color: #FFF;
      font-size: 35px;
      box-shadow: 0 10px 20px rgba(255, 74, 2, .3);
      width: 100%;
    }
  }

  .aucontent {
    ul {
      padding: 10px 30px;

      li {
        margin: 10px 0;
        position: relative;

        img {
          width: 100%;
        }

      }
    }
  }

  .auDemo {
    padding: 10px 30px;

    img {
      width: 100%;
    }
  }

  .delicon {
    position: absolute;
    top: -10px;
    right: -10px;
    background: red;
    color: #FFF;
    padding: 3px 10px;
    border-radius: 20px;
  }

</style>
