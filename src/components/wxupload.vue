<template>
<div class="csup">
  <ul>
    <li v-show="tempImgs.length<max" @click="chooseImg"><div class="pics addpic"><img src="./imgs/addpic.png">
      <!--<input-->
      <!--@change="handleFileChange"-->
      <!--ref="inputer"-->
      <!--class="uploadbtn"-->
      <!--accept="image/*"-->

      <!--type="file"/>-->
    </div></li>
    <li v-for="img in tempImgs">
        <div class="pics">
          <img :src="img.url"/>
        </div>
        <i class="del" @click="delimg(img)"><img src="./imgs/closeSearch.png"/> </i>
    </li>
    <div class="cl"></div>
  </ul>
</div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "csupload",
    props:['max'],
    data() {
      return {
        filePath: null,
        targetFile:null,
        imgurl:'',
        tempImgs:[],
        previewImg:{data:''},
      }
    },
    methods: {
      chooseImg(){//微信选择图片

        alert()
        let that = this;
          wx.ready(function () {
            wx.chooseImage({
              count: 1, // 默认9
              sizeType:['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                that.uploadWximg(res.localIds).then(serverObj=>{
                  // alert('上传成功'+JSON.stringify(serverObj));
                  return that.getwxImg(serverObj)
                }).then(ossimg=>{
                  // alert('oss上传'+ossimg.data)
                  that.tempImgs.push({url:ossimg.url});
                })
              }
            });
          })
      },
      uploadWximg(localIds){//微信上传localid
        return new Promise((resolve,reject)=> {
            wx.ready(function () {
              wx.uploadImage({
                localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                  var serverId = res.serverId; // 返回图片的服务器端ID
                  resolve(res.serverId);
                }
              });
            })
        })
      },
      getwxImg(mid){//获取mideid 并得到oss 地址
        return new Promise((resolve,reject)=> {
          this.$http.post('uploadCardImages',{
            data:{
              mediaId:'',
              image_type:'',
              name:''//可选
            }
          }).then(res => {
            resolve(res.data);
          })
        })
      },
      delimg(obj){
        var idx = this.tempImgs.findIndex(function(x){
          return obj.url == x.url
        })
        this.tempImgs.splice(idx,idx+1);
      },
      handleFileChange(e) {
        let that = this;
        let inputDOM = this.$refs.inputer;
        this.targetFile = inputDOM;
        // 通过DOM取文件数据

        this.file = inputDOM.files[0];

        this.errText = '';
        let size = Math.floor(this.file.size / 1024);
        if (size > 1024*2) {
          // 这里可以加个文件大小控制
          $.toast('上传文件不要超过2M')
          return false
        }
        // 触发这个组件对象的input事件
        this.$emit('input', this.file);

        // 这里就可以获取到文件的名字了
        this.fileName = this.file.name;
        // 这里加个回调也是可以的
        // this.onChange && this.onChange(this.file, inputDOM.value);

        this.upload(this.file);
      },
      upload() {
        let that = this;
        function ossSign() {//签名
          var p = new Promise(function (resolve, reject) {
            that.$http.get('authentication/weChat/ossSignature').then((res) => {
              resolve(res.data);
            })
          })
          return p;
        }
        function ossUpload(sign) {//上传到阿里云
          var p = new Promise(function (resolve, reject) {
            let data = {
              "key": "string",
              "name": "string",
              "type": "string",
              "vpath": "string"
            }
            let file = that.targetFile.files[0];

            /* eslint-disable no-undef */
            var last = file.name.split('.').length;
            var chuo = new Date().getTime()+'.'+file.name.split('.')[last-1];
            let param = new FormData()  // 创建form对象
            param.append('chunk', '0') // 添加form表单中其他数据
            param.append('OSSAccessKeyId', sign.data.accessid) // 添加form表单中其他数据
            param.append('policy', sign.data.policy) // 添加form表单中其他数据
            param.append('Signature', sign.data.signature) // 添加form表单中其他数据
            param.append('Expires', sign.data.expire) // 添加form表单中其他数据
            param.append('key',sign.data.dir+chuo) // 添加form表单中其他数据
            param.append('success_action_status','200') // 添加form表单中其他数据
            param.append('Access-Control-Allow-Origin','*') // 添加form表单中其他数据
            param.append('file',file, file.name)  // 通过append向form对象添加数据
            console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
            let config = {
              headers: {'Content-Type': 'multipart/form-data'}
            }
            // 添加请求头
            console.log(config);
            // that.$toast('上传中,请稍后...');
            that.$indicator.open({
              text: '上传中',
              spinnerType: 'fading-circle'
            });
            that.imgurl = sign.data.host;
            axios.post(sign.data.host, param, config)
              .then(response => {
                if(response.status == 200){
                  let rimg={
                    key:sign.data.dir+chuo,
                    name:file.name
                  }
                  that.$indicator.close()
                  that.$refs.inputer.value = '';
                  resolve(rimg);
                }
              })
          })
          return p;
        }
        // 上传到boss服务器
        function uploadBoss(img){
          var imgJson = {
            "key": img.key,
            "name":img.name
          }
          var p = new Promise(function (resolve,reject) {
            axios.post('/api/ossUplod',imgJson).then((res)=>{
              resolve(res.data);

            })
          })
          return p;
        }

        ossSign()
          .then((data) => {//上传到阿里云
            return ossUpload(data);
          })
          .then((data) => {
            console.log(this.imgurl+'/'+data.key);
            var newimg = this.imgurl+'/'+data.key;
            this.tempImgs.push({url:newimg});
          })

      }
    }
  }
</script>

<style lang="scss" scoped>
  .csup{
    ul{
      padding-bottom: 30px;
      li{

        float:left;
        width:150px;
        height:150px;
        position: relative;
        margin-right:20px;
        border:2px solid #DDD;
        border-radius: 10px;
        .pics{
          width:150px; height: 150px;
          overflow: hidden;
          position: relative;
          input{
            font-size:200pt;
            z-index: 999;
            position: absolute;
            opacity: 0;
            width:100%;
            height:100%;
            left:0;
            top:0;
          }

          img{width:100%;height:100%;border-radius: 10px;}
        }
        .addpic{
          img{opacity: .2}
        }
        i.del{
          background: red;
          width:40px;
          height:40px;
          position: absolute;
          top:-20px;
          right:-20px;
          color:#FFF;
          border-radius: 2000px;

          box-shadow: 0px 0 2px #CCC;
          img{
            width:100%;
            height:100%;
            opacity: .8;
          }
        }
      }
    }

  }
</style>
