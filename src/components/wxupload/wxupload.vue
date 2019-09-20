<template>



    <div class="csup">
      <div class="upicon" v-if="showicon">
        <img src="@/assets/img/upicon.png"/>
        <div class="utext">上传图片</div>
      </div>
    </div>




</template>

<script>
  import axios from 'axios'
  export default {
    name: "wxupload",
    props:['upinfo','showicon','upinfozm','upinfofm'],
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
      chooseImg(str='',name=''){//微信选择图片
         // if(str == 1){
         //   this.$emit('upinfo','https://www.baidu.com/img/bd_logo1.png?qua=high')
         // }else{
         //   this.$emit('upinfo','https://mat1.gtimg.com/pingjs/ext2020/qqindex2018/dist/img/qq_logo_2x.png')
         //
         // }


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
                return that.getwxImg(serverObj,str,name)
              }).then(ossimg=>{
                // alert('oss上传'+ossimg.data)
                if(ossimg.code == 0){
                  // alert(JSON.stringify(ossimg))
                  if(str == 1){
                    that.$parent.$data.idcard = ossimg.id_card
                    that.$emit('upinfozm',ossimg.url)
                  }else if(str ==2){
                    that.$emit('upinfofm',ossimg.url)
                  }else {
                    that.$emit('upinfo',ossimg.url)
                  }


                }else{
                  alert(ossimg.msg)
                }

                // that.tempImgs.push({url:ossimg.data});
              },error=>{

                 // that.$emit('upinfozm','111')

                alert('上传失败请重新选择')
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
      getwxImg(mid,str,name){//获取mideid 并得到oss 地址
        return new Promise((resolve,reject)=> {

          if(str == 1 || str == 2){//身份证验证
            var pdata;
            var phone = this.$route.query.phone || ''
            var m = localStorage.getItem('myphone') || ''
            phone = phone?phone:m
            pdata={
              mediaId:mid,
              image_type:str,
              name:name
            }
            if(phone){
              pdata.phone = phone
              pdata.is_return = 0
            }else{
              pdata.phone = phone
              pdata.is_return = 1
            }
            if(str == 2){
              pdata.id_card = this.$parent.$data.idcard;
              // alert(JSON.stringify(pdata))

            }
            // alert('开始请求uploadCardImages'+ JSON.stringify(pdata))
            this.request.post('mapi/uploadCardImages',pdata).then(res => {
              // alert('请求成功'+JSON.stringify(res))
              resolve(res);
            },error=>{
              // alert('请求失败')
              reject()
            })
          }else{//公司营业执照
            var pdata={
              id:mid
            }
            this.request.post('mapi/uploadIndustryImg',pdata).then(res => {
              resolve(res);
            },error=>{
              reject()
            })
          }

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
    opacity:.9;

    top:0;
    left:0;
    text-align:center;
    position:absolute;
    width:100%;
    height:100%;
    .upicon{

      color:red;
      width:120px;
      height: 60px;
      position: absolute;
      left:50%;
      top:50%;
      margin-left:-60px;
      margin-top:-60px;

      img{
        width:60px;

      }
      .utext{
        position: absolute;
        width:100%;
        text-align: center;
        color:#08F;
      }
    }

  }
  .csup:active{
    opacity: 1;}
</style>
