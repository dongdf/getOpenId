<template>
  <div>
    <div class="forgetSetp breakfour">
      <ul class="clearfix">
        <li class="leftli active "><a href=""><i>1</i><span>视频认证</span></a></li>
        <li class="leftli " :class="setpidx>=2?'active':''"><a href=""><i>2</i><span>完善信息</span></a></li>
        <li class="leftli " :class="setpidx>=3?'active':''"><a href=""><i>3</i><span>确认信息</span></a></li>
        <li class="" :class="setpidx>=4?'active':''"><a href=""><i>4</i><span>签约</span></a></li>
      </ul>
    </div>
    <div v-show="setpidx == 1">
      <div v-show="!showVideo">
        <div class="notice"><img class="info_img" src="../../assets/img/info.png"><span>请仔细观看下方视频</span></div>
        <div class="aucontent">
          <ul>
            <div class="vid-wrap">
              <video id="myVideo" controls="controls" poster='预览图' preload="auto" x5-playsinline="" playsinline=""
                     webkit-playsinline="">
                <source src="https://renshe.oss-cn-beijing.aliyuncs.com/miniProgram/authentication.mp4"
                        type="video/mp4">
              </video>
            </div>
          </ul>
        </div>
        <div class="subc" v-show="showNextButton">
          <button @click="nextButton" class="main">下一步</button>
        </div>
      </div>
      <div v-show="showVideo">
        <div class="tip">
          <img class="info_img" src="../../assets/img/info.png">
          <span>请手持身份证正面，<strong>正确读取下列文字，录制视频并上传</strong>，录制过程请保证视频、声音清晰</span>
        </div>
        <div class="msg">我叫XXX,身份证号是XXX,联系电话是XXX,我自愿注册个体工商户</div>
        <div class="aucontent">
          <ul v-if="videoUrl.length>0">
            <div class="vid-wrap">
              <video id="authVideo" controls="controls" poster='预览图' preload="auto" x5-playsinline="" playsinline=""
                     webkit-playsinline="">
                <source :src="videoUrl" type="video/mp4">
              </video>
            </div>
          </ul>
          <ul v-else @click="upVideo">
            <li><img src="../../assets/img/upload_voide.png"/>
              <input type="file" ref="inputerVideo" accept="video/*" id="fileUpload"
                     style="position:absolute; clip:rect(0 0 0 0);" @change="uploadVideo($event)">
            </li>
          </ul>
          <div class="viewVideo" @click="viewVideo">
            <img class="info_img" src="../../assets/img/play.png">
            <span>查看视频样例</span>
          </div>
        </div>
        <div class="sizeBox"></div>
        <div class="subc">
          <button class="reUpload" @click="upVideo">重新上传</button>
          <div class="sizeBox"></div>
          <button @click="gonext(2)" class="main">提交</button>
        </div>
      </div>
    </div>
    <div v-show="setpidx == 2">
      <div class="busContent">
        <ul>
          <li class="fileTitle">基本信息</li>
          <li>
            <div class="filelabel">姓名</div>
            <div class="filecontent" style="color:#666;">
              {{curInfo.name}}
            </div>
          </li>
          <li>
            <div class="filelabel">性别</div>
            <div class="filecontent" style="color:#666;">
              <span>{{curInfo.sex_str}}</span>
            </div>
          </li>
          <li>
            <div class="filelabel">身份证</div>
            <div class="filecontent" style="color:#666;">
              {{curInfo.id_card}}
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
            </div>
          </li>
          <li>
            <div class="filelabel">银行开卡号</div>
            <div class="filecontent">
              {{curInfo.bank_account}}
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
            </div>
          </li>
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
            <p v-if="confirmType.id">{{confirmType.name}}</p>
          </li>
          <li>
            <h3>经营范围</h3>
            <div class="comrange">
              <ul>
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
              </ul>
            </div>
          </li>
          <li style="border:none;" v-show="mynamelist">
            <h3>个体申请名称</h3>
            <ul class="rangnamelist">
              <li v-for="(k,index) in mynamelist">{{k}}
                <label @click="editcomName(k,index)" class="eidtname">
                  <img src="../../assets/img/edit.jpg"/>
                </label>
              </li>
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
  import axios from 'axios'

  export default {
    name: 'suqianAuth',
    components: {pickeritem, areas},
    data () {
      return {
        showNextButton: false,
        showVideo: true,
        videoUrl: '',
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
        areaShow: false
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
    mounted () {
      let myVideo = document.getElementById('myVideo')
      // 监听播放开始
      let that = this
      myVideo.addEventListener('play', function () {
        that.showNextButton = true
      })
    },
    methods: {
      /**
       * 下一步
       */
      nextButton () {
        let myVideo = document.getElementById('myVideo')
        myVideo.pause()
        this.showVideo = false
      },
      /**
       * 查看视频样例
       */
      viewVideo () {
        this.videoUrl = ''
        this.showVideo = true
        this.showNextButton = false
      },
      /**
       * 上传视频
       */
      upVideo () {
        this.$refs.inputerVideo.click()
      },
      /**
       * 选择视频
       */
      uploadVideo (e) {
        let mediaFile = e.target.files[0]
        let mediaFileSize = mediaFile.size
        let size = Math.floor(mediaFileSize / 1024)
        if (size > 1024 * 200) {
          // 这里可以加个文件大小控制
          this.$toast('上传视频文件不要超过200M')
          return false
        }
        this.uploadFile(mediaFile)
      },
      /**
       * 视频文件上传
       */
      uploadFile (mediaFile) {
        let that = this
        that.$http.post('/mapi/getOssConfig', {}).then(result => {
          let res = JSON.parse(result.data)
          if (res.code === 0) {
            let file = mediaFile
            let last = file.name.split('.').length
            let chuo = new Date().getTime() + '.' + file.name.split('.')[last - 1]
            // 创建form对象
            let param = new FormData()
            param.append('OSSAccessKeyId', res.data.accessid) // 添加form表单中其他数据
            param.append('policy', res.data.policy) // 添加form表单中其他数据
            param.append('Signature', res.data.signature) // 添加form表单中其他数据
            param.append('key', res.data.dir + chuo) // 添加form表单中其他数据
            param.append('success_action_status', '200') // 添加form表单中其他数据
            param.append('Access-Control-Allow-Origin', '*') // 添加form表单中其他数据
            param.append('file', file, file.name)  // 通过append向form对象添加数据
            console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
            let config = {
              headers: {'Content-Type': 'multipart/form-data'}
            }
            // 添加请求头
            console.log(config)
            that.$indicator.open({
              text: '上传中',
              spinnerType: 'fading-circle'
            })
            axios.post(res.data.host, param, config)
              .then(response => {
                if (response.status === 200) {
                  let rimg = {
                    key: res.data.dir + chuo,
                    name: file.name
                  }
                  that.$indicator.close()
                  that.$refs.inputerVideo.value = ''
                  let videoUrl = res.data.host + '/' + rimg.key
                  that.uploadMidAuthVideo(videoUrl)
                }
              })
          } else {
            this.$toast(res.msg)
            return false
          }
        })
      },
      /**
       * 认证视频保存
       */
      uploadMidAuthVideo (videoUrl) {
        let pdata = {
          video: videoUrl,
          company_id: this.$route.query.cid
        }
        this.request.post('mapi/uploadMidAuthVideo', pdata).then(res => {
          if (res.code === 0) {
            this.videoUrl = res.url
            this.$promot({
              name: '$promot',
              width: '80%',
              title: '基本信息',
              funCode: 'success',
              props: {
                isableclose: false,
                tipText: '上传成功'
              },
              callback: (close) => {
                close()
                this.upVideo()
              }
            })
          } else {
            this.$promot({
              name: '$promot',
              width: '80%',
              title: '基本信息',
              funCode: 'error',
              props: {
                isableclose: false,
                tipText: '视频上传失败请重新上传'
              },
              callback: (close) => {
                close()
                this.upVideo()
              }
            })
            // alert(res.msg)
          }
        }, error => {
          this.$promot({
            name: '$promot',
            width: '80%',
            title: '基本信息',
            funCode: 'error',
            props: {
              isableclose: false,
              tipText: '视频上传失败请重新上传'
            },
            callback: (close) => {
              close()
              this.upVideo()
            }
          })
          // alert('请重新保存')
        })
      },
      areaOk (areaObj) {
        console.log(JSON.stringify(areaObj))
        this.areaShow = false
        this.areaselectname = areaObj.province.name + '/' + areaObj.city.name + '/' + areaObj.county.name
        this.selectAreaInfo = areaObj
      },
      areaCancle () {
        this.areaShow = false
      },
      /**
       * 身份证预览
       */
      viewIdcard () {
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
          if (res.code === 0) {
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
          type: this.confirmType.id, // 个体工商户类型id,
          company_id: this.$route.query.cid
        }).then(res => {
          if (res.code === 0) {
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
            if (res.code === 0) {
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
            if (res.code === 0) {
              localStorage.setItem('suqianAuth' + this.$route.query.cid, str)
              this.$router.push({
                path: '/authPerson',
                query: {
                  funCode: 'suqianAuth',
                  setp: str,
                  cid: this.$route.query.cid
                }
              })
            } else {
              alert(res.msg)
            }
          }, error => {
            alert('提交失败，请重试')
          })
        } else if (str === 3) {
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
              education: this.curInfo.education ? this.curInfo.education : '初中',
              company_id: this.$route.query.cid,
              id: this.curInfo.id,
              hourly_wage: 20
            }
            this.request.post('mapi/saveInfo', pdata).then(res => {
              if (res.code === 0) {
                localStorage.setItem('suqianAuth' + this.$route.query.cid, str)
                this.$router.push({
                  path: '/authPerson',
                  query: {
                    funCode: 'suqianAuth',
                    cid: this.$route.query.cid,
                    setp: str
                  }
                })
              } else {
                alert(res.msg)
              }
            }, error => {
              alert('请重新保存')
            })
          }, error => {
            alert(error)
          })
        } else if (str === 2) {
          this.$promot({
            name: '$promot',
            width: '80%',
            title: '基本信息',
            funCode: 'error',
            props: {
              isableclose: false,
              tipText: '视频上传失败请重新上传'
            },
            callback: (close) => {
              close()
            }
          })
          return false
          if (this.videoUrl.length === 0) {
            this.$toast('请上传认证视频')
            return false
          } else {
            localStorage.setItem('suqianAuth' + this.$route.query.cid, str)
            this.$router.push({
              path: '/authPerson',
              query: {
                funCode: 'suqianAuth',
                cid: this.$route.query.cid,
                setp: str
              }
            })
          }
        } else {
          this.$router.push({
            path: '/authPerson',
            query: {
              funCode: 'suqianAuth',
              setp: str,
              cid: this.$route.query.cid
            }
          })
        }
      },
      upinfozm (value) {
        this.upimgzm.push(IMG_URL + value)
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

  .notice {
    padding: 40px 0;
    text-align: center;
    color: #FF4A02;
    font-size: .373333rem;
    font-weight: 800;
  }

  .notice span {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  .notice .info_img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    vertical-align: middle;
  }

  .tip {
    padding: 40px 0.4rem;
    text-align: left;
    color: #FF4A02;
    font-size: .373333rem;
  }

  .tip span {
    height: 100%;
    vertical-align: middle;
  }

  .tip .info_img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    vertical-align: middle;
  }

  .msg {
    padding: 0px 0.4rem;
    text-align: left;
    font-size: .373333rem;
  }

  .vid-wrap {
    width: 100%;
    background: #000;
    position: relative;
    padding-bottom: 56.25%; /*需要用padding来维持16:9比例,也就是9除以16*/
    height: 0;
  }

  .vid-wrap video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .sizeBox {
    height: 40px;
  }

  .viewVideo {
    text-align: right;
    padding-right: 0.4rem;
    color: #1D56FE;
  }

  .viewVideo span {
    height: 100%;
    vertical-align: middle;
  }

  .viewVideo .info_img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    vertical-align: middle;
  }

  .reUpload {
    padding: 0.266667rem;
    border-radius: 1.333333rem;
    border: 2px solid #FF4A02;
    background: #FFF;
    text-align: center;
    color: #FF4A02;
    font-size: 0.466667rem;
    display: block;
    width: 100%;
  }
</style>
