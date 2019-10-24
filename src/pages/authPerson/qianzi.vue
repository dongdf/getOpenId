<template>
  <mt-popup v-model="showQz" position="bottom" class="mint-popup-3" :modal="true">
    <div class="qzq">
      <div class="qzqContent">
        <div class="qzqbar">
          <div class="demoname">签名:{{qname}}</div>
          <div @click="reset()" class="clearname" style="text-align: center"><i><img
            src="../../assets/img/clearname.jpg"/> </i>清除
          </div>
          <div class="demoname" style="text-align: right" @click="closepp"> 关闭</div>
        </div>
        <div class="canvasqz">
          <iframe id="qzq" class="qzban" ref="qzq" frameborder="0" v-if="showQz" src="./static/signature.html"></iframe>
        </div>
        <div>
          <button class="main" @click="saveqzq" :disabled="showDisabled">{{showDisabled?'签约中...':'立即签约'}}</button>
        </div>
      </div>
    </div>
  </mt-popup>
</template>

<script>
  //base64转blob
  function dataURLtoBlob (dataurl) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], {type: mime})
  }

  //将blob转换为file
  function blobToFile (theBlob, fileName) {
    theBlob.lastModifiedDate = new Date()
    theBlob.name = fileName
    return theBlob
  }

  export default {
    props: ['showQz', 'numbs', 'qname'],
    name: 'qianzi',

    data () {
      return {
        showDisabled: false
      }
    },
    mounted () {

    },
    methods: {
      saveqzq () {
        var img = document.getElementById('qzq').contentWindow
        let returnImg = img.canvas.toDataURL('image/png')
        console.log(returnImg)

        var _blob = dataURLtoBlob(returnImg)
        var suffix = returnImg.split(';')[0].split(':')[1].split('/')[1]//文件扩展名
        var filename = String(new Date().getTime()) + '.' + suffix
        var _file = blobToFile(_blob, filename)
        if (_file.size > 512 * 1024) {
          this.$toast('签名图片过大，请重新签名')
          return false
        }
        this.showDisabled = true
        this.saveqm(returnImg).then(res => {
          setTimeout(() => {
            this.$indicator.open({
              text: '签约中,请稍后...',
              spinnerType: 'snake'
            })
          }, 220)
          //进行签名
          this.$http.post('mapi/upSign?connect_redirect=1', {
            url: res.data,
            company_id: this.$route.query.cid,
            cmloading: true
          }, {timeout: 1000 * 60 * 20}).then(result => {
            var sidata = JSON.parse(result.data)
            this.showDisabled = false
            this.$indicator.close()
            if(sidata.code == 0) {
              this.$toast('签约完成')
              this.$router.push({
                path: '/mine',
                query: {
                  funCode: 'minfo'
                }
              })
            } else {
              alert(sidata.msg)
            }
          }, error => {
            this.showDisabled = false
            this.$indicator.close()
            alert('签约失败。')
          })
        },error => {
          this.showDisabled = false
          alert(error)
        })

      },
      saveqm (baseimg) {//保存base64
        return new Promise((resolve, reject) => {
          this.$http.post('mapi/uploadSignImg?connect_redirect=1', {img: baseimg}, {timeout: 1000 * 60 * 20}).then(res => {
            var result = JSON.parse(res.data)
            if (result.code == 0) {
              resolve(result)
            } else {
              reject('上传失败，请清空重新签名')
            }
          }, error => {
            reject('上传失败,请重试')
          })
        })
      },
      reset () {

        document.getElementById('qzq').contentWindow.clearcanvas()
      },
      upload () {
        let that = this

        function ossSign () {//签名
          var p = new Promise(function (resolve, reject) {
            that.$http.get('authentication/weChat/ossSignature').then((res) => {
              resolve(res.data)
            })
          })
          return p
        }

        function ossUpload (sign) {//上传到阿里云
          var p = new Promise(function (resolve, reject) {
            let data = {
              'key': 'string',
              'name': 'string',
              'type': 'string',
              'vpath': 'string'
            }
            let file = that.targetFile.files[0]

            /* eslint-disable no-undef */
            var last = file.name.split('.').length
            var chuo = new Date().getTime() + '.' + file.name.split('.')[last - 1]
            let param = new FormData()  // 创建form对象
            param.append('chunk', '0') // 添加form表单中其他数据
            param.append('OSSAccessKeyId', sign.data.accessid) // 添加form表单中其他数据
            param.append('policy', sign.data.policy) // 添加form表单中其他数据
            param.append('Signature', sign.data.signature) // 添加form表单中其他数据
            param.append('Expires', sign.data.expire) // 添加form表单中其他数据
            param.append('key', sign.data.dir + chuo) // 添加form表单中其他数据
            param.append('success_action_status', '200') // 添加form表单中其他数据
            param.append('Access-Control-Allow-Origin', '*') // 添加form表单中其他数据
            param.append('file', file, file.name)  // 通过append向form对象添加数据
            console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
            let config = {
              headers: {'Content-Type': 'multipart/form-data'}
            }
            // 添加请求头
            console.log(config)
            // that.$toast('上传中,请稍后...');
            that.$indicator.open({
              text: '上传中',
              spinnerType: 'fading-circle'
            })
            that.imgurl = sign.data.host
            axios.post(sign.data.host, param, config)
              .then(response => {
                if (response.status == 200) {
                  let rimg = {
                    key: sign.data.dir + chuo,
                    name: file.name
                  }
                  that.$indicator.close()
                  that.$refs.inputer.value = ''
                  resolve(rimg)
                }
              })
          })
          return p
        }

        // 上传到boss服务器
        function uploadBoss (img) {
          var imgJson = {
            'key': img.key,
            'name': img.name
          }
          var p = new Promise(function (resolve, reject) {
            axios.post('/api/ossUplod', imgJson).then((res) => {
              resolve(res.data)

            })
          })
          return p
        }

        ossSign()
          .then((data) => {//上传到阿里云
            return ossUpload(data)
          })
          .then((data) => {
            console.log(this.imgurl + '/' + data.key)
            var newimg = this.imgurl + '/' + data.key
            this.tempImgs.push({url: newimg})
          })

      },
      closepp () {
        this.$parent.$parent.closepp()
      }

    }
  }
</script>

<style lang="scss" scoped>


  .qzban {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;

  }

  .canvasqz {
    height: 500px;
    position: relative;
    border: 2px solid #DDD;
    overflow: hidden;
    margin-bottom: 20px;
  }

  .mint-popup-3 {
    background: none !important;
    width: 100%;
    height: 100%;

    .qzq {
      position: absolute;
      left: 0;
      right: 0;
      z-index: 9999;
      bottom: 0;
      background: #FFF;

      .qzqContent {
        padding: 30px;

        .qzqbar {
          display: flex;

          .demoname {
            text-align: left;
            width: 100%;
          }

          .clearname {
            text-align: right;
            width: 100%;
            position: relative;
            top: -15px;

            i {
              display: inline-block;
              width: 50px;

              img {
                width: 100%;
              }

              position: relative;
              top: 10px;
              margin-right: 10px;
            }

          }

        }
      }
    }
  }
</style>
