<template>
  <mt-popup v-model="showQz"    position="bottom" class="mint-popup-3" :modal="true">

    <div class="qzq">
      <div class="qzqContent">

        <div class="qzqbar">
          <div class="demoname">签名:{{qname}}</div>
          <div @click="reset()" class="clearname" style="text-align: center"><i><img src="../../assets/img/clearname.jpg"/> </i>清除 </div>
          <div class="demoname" style="text-align: right" @click="closepp"> 关闭 </div>

        </div>
        <div class="canvasqz">
           <iframe id="qzq" class="qzban" ref="qzq" frameborder="0" v-if="showQz" src="./static/signature.html"></iframe>
        </div>
        <div>
          <button class="main" @click="saveqzq">立即签约({{numbs}})</button>
        </div>
      </div>
    </div>
  </mt-popup>
</template>

<script>

  //base64转blob
  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  //将blob转换为file
  function blobToFile(theBlob, fileName) {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

  export default {
    props:['showQz','numbs','qname'],
    name: "qianzi",

    data() {
      return {


      }
    },
    mounted() {
      // function WriteFont(id, options) {
      //   var self = this;
      //   this.canvas = document.getElementById(id);
      //   var obj = {
      //     canvas: this.canvas,
      //     context: this.canvas.getContext("2d"),
      //     isWrite: false,	//是否开始
      //     lastWriteTime: -1,
      //     lastWriteSpeed: 0,
      //     lastWriteWidth: 0,
      //     canvasWidth: 200,	//canvas宽高
      //     canvasHeight: 200,
      //     isShowBorder: true,	//是否显示网格
      //     bgColor: '#fff',	//背景色
      //     borderWidth: 2,	//	网格线宽度
      //     borderColor: "#fff",	//网格颜色
      //     lastPoint: {},	//
      //     writeWidth: 2,	//基础轨迹宽度
      //     maxWriteWidth: 30,	// 写字模式最大线宽
      //     minWriteWidth: 1,	// 写字模式最小线宽
      //     writeColor: '#000',	//	轨迹颜色
      //     isWriteName:false	//签名模式
      //   }
      //
      //   for(var name in options) {
      //     obj[name] = options[name];
      //   }
      //
      //   /**
      //    * 轨迹宽度
      //    */
      //   this.setLineWidth = function() {
      //     var nowTime = new Date().getTime();
      //     var diffTime = nowTime - obj.lastWriteTime;
      //     obj.lastWriteTime = nowTime;
      //     var returnNum = obj.minWriteWidth + (obj.maxWriteWidth - obj.minWriteWidth) * diffTime / 30;
      //     if(returnNum < obj.minWriteWidth) {
      //       returnNum = obj.minWriteWidth;
      //     } else if(returnNum > obj.maxWriteWidth) {
      //       returnNum = obj.maxWriteWidth;
      //     }
      //
      //     returnNum = returnNum.toFixed(2);
      //     //写字模式和签名模式
      //     if(obj.isWriteName){
      //       obj.context.lineWidth = obj.writeWidth;
      //     }else{
      //       obj.context.lineWidth = obj.lastWriteWidth = obj.lastWriteWidth / 4 * 3 + returnNum / 4;
      //     }
      //   }
      //
      //   /**
      //    * 绘制轨迹
      //    */
      //   this.writing = function(point) {
      //     obj.context.beginPath();
      //     obj.context.moveTo(obj.lastPoint.x, obj.lastPoint.y);
      //     obj.context.lineTo(point.x, point.y);
      //     self.setLineWidth();
      //     obj.context.stroke();
      //     obj.lastPoint = point;
      //     obj.context.closePath();
      //   }
      //
      //   /**
      //    * 轨迹样式
      //    */
      //   this.writeContextStyle = function() {
      //     obj.context.beginPath();
      //     obj.context.strokeStyle = obj.writeColor;
      //     obj.context.lineCap = 'round';
      //     obj.context.lineJoin = "round";
      //   }
      //
      //   /**
      //    * 写开始
      //    */
      //   this.writeBegin = function(point) {
      //     obj.isWrite = true;
      //     obj.lastWriteTime = new Date().getTime();
      //     obj.lastPoint = point;
      //     self.writeContextStyle();
      //   }
      //
      //   /**
      //    * 写结束
      //    */
      //   this.writeEnd = function() {
      //     obj.isWrite = false;
      //   }
      //
      //   /**
      //    * 清空画板
      //    */
      //   this.canvasClear = function() {
      //     obj.context.save();
      //     obj.context.strokeStyle = '#fff';
      //     obj.context.clearRect(0, 0, obj.canvasWidth, obj.canvasHeight);
      //     if(obj.isShowBorder && !obj.isWriteName) {
      //       obj.context.beginPath();
      //       var size = obj.borderWidth / 2;
      //       //画外面的框
      //       obj.context.moveTo(size, size);
      //       obj.context.lineTo(obj.canvasWidth - size, size);
      //       obj.context.lineTo(obj.canvasWidth - size, obj.canvasHeight - size);
      //       obj.context.lineTo(size, obj.canvasHeight - size);
      //       obj.context.closePath();
      //       obj.context.lineWidth = obj.borderWidth;
      //       obj.context.strokeStyle = obj.borderColor;
      //       obj.context.stroke();
      //       //画里面的框
      //       obj.context.moveTo(0, 0);
      //       obj.context.lineTo(obj.canvasWidth, obj.canvasHeight);
      //       obj.context.lineTo(obj.canvasWidth, obj.canvasHeight / 2);
      //       obj.context.lineTo(obj.canvasWidth, obj.canvasHeight / 2);
      //       obj.context.lineTo(0, obj.canvasHeight / 2);
      //       obj.context.lineTo(0, obj.canvasHeight);
      //       obj.context.lineTo(obj.canvasWidth, 0);
      //       obj.context.lineTo(obj.canvasWidth / 2, 0);
      //       obj.context.lineTo(obj.canvasWidth / 2, obj.canvasHeight);
      //       obj.context.stroke();
      //
      //     }
      //     obj.context.restore();
      //   }
      //
      //   /**
      //    * 保存图片 格式base64
      //    */
      //   this.saveAsImg = function() {
      //     var image = new Image();
      //     image.src = this.canvas.toDataURL("image/png");
      //     if(image.src == this.emptyCanvas) {
      //       alert('请先书写')
      //     } else {
      //       console.log('提交的内容===>', image.src)
      //     }
      //   };
      //
      //   /**
      //    * 初始化画板
      //    */
      //   this.canvasInit = function() {
      //     this.canvas.width = obj.canvasWidth;
      //     this.canvas.height = obj.canvasHeight;
      //     this.emptyCanvas = this.canvas.toDataURL("image/png");
      //   }
      //
      //   /**======================事件绑定===========================**/
      //
      //   this.canvas.addEventListener('mousedown', function(e) {
      //
      //     var point = {
      //       x: e.offsetX || e.clientX,
      //       y: e.offsetY || e.clientY
      //     };
      //
      //     self.writeBegin(point);
      //   });
      //
      //   this.canvas.addEventListener('mouseup', function(e) {
      //     var point = {
      //       x: e.offsetX,
      //       y: e.offsetY
      //     };
      //     self.writeEnd(point);
      //   });
      //
      //   this.canvas.addEventListener('mouseleave', function(e) {
      //     var point = {
      //       x: e.offsetX,
      //       y: e.offsetY
      //     };
      //     self.writeEnd(point);
      //   });
      //
      //   this.canvas.addEventListener('mousemove', function(e) {
      //     if(obj.isWrite) {
      //       var point = {
      //         x: e.offsetX,
      //         y: e.offsetY
      //       };
      //
      //       self.writing(point);
      //     }
      //   });
      //
      //   //移动端
      //   this.canvas.addEventListener('touchstart', function(e) {
      //     var touch = e.targetTouches[0];
      //     var point = {
      //       x: touch.pageX || touch.clientX,
      //       y: touch.pageY || touch.clientY
      //     };
      //     alert(JSON.stringify(point))
      //     self.writeBegin(point);
      //   });
      //   this.canvas.addEventListener('touchend', function(e) {
      //     var touch = e.changedTouches[0];
      //     var point = {
      //       x: touch.pageX,
      //       y: touch.pageY
      //     };
      //     self.writeEnd(point);
      //   });
      //   this.canvas.addEventListener('touchmove', function(e) {
      //     var touch = e.targetTouches[0];
      //     var point = {
      //       x: touch.pageX,
      //       y: touch.pageY
      //     };
      //     self.writeEnd(point);
      //   });
      //   this.canvas.addEventListener('touchmove', function(e) {
      //     var touch = e.targetTouches[0];
      //     var point = {
      //       x: touch.pageX,
      //       y: touch.pageY
      //     };
      //     self.writing(point);
      //   });
      //
      //   this.canvasInit();
      //   this.canvasClear();
      //
      //   this.option = obj;
      //   obj.control = {
      //     clearCanvas: self.canvasClear
      //   };
      // }
      //
      // /**
      //  * 初始化调用
      //  * 设置参数
      //  */
      // var writeCanvas = new WriteFont('canvas', {
      //   borderWidth: 10,
      //   writeWidth:3,
      //   borderColor: '#ff6666',
      //   isWriteName:true	//签名模式
      // });
      //
      // document.getElementById('clear').onclick = function() {
      //   writeCanvas.option.control.clearCanvas();
      // };
      //
      // document.getElementById('save').onclick = function() {
      //   writeCanvas.saveAsImg()
      // };


    },
    methods:{
      saveqzq(){
        var img  =  document.getElementById('qzq').contentWindow
        let returnImg = img.canvas.toDataURL("image/png");
        console.log(returnImg)

        var _blob = dataURLtoBlob(returnImg);
        var suffix = returnImg.split(';')[0].split(':')[1].split('/')[1];//文件扩展名
        var filename = String(new Date().getTime())+'.'+suffix;
        var _file = blobToFile(_blob, filename)
        if(_file.size>512*1024){
          this.$toast('签名图片过大，请重新签名');
          return false;
        }
        this.saveqm(returnImg).then(res=>{

          setTimeout(()=>{
            this.$indicator.open({
              text: '签约中,请稍后...',
              spinnerType: 'snake'
            });
          },220)



          //进行签名
          this.request.post('mapi/upSign',{url:res.data,company_id:this.$route.query.cid,cmloading:true}).then(sidata=>{
            this.$indicator.close();
            if(sidata.code == 0){
              this.$toast('签约完成')
              this.$router.push({
                path:'/mine',
                query:{
                  funCode:"minfo"
                }
              })
            }else{
              alert(sidata.msg)
            }

          },error=>{
            this.$indicator.close();
            alert('签约失败。')
          })
        },error=>{
          alert(error)
        })


      },
      saveqm(baseimg){//保存base64

        return new Promise((resolve,reject) =>{
          this.request.post('mapi/uploadSignImg',{img:baseimg}).then(res=>{
            if(res.code == 0){
              resolve(res)
            }else{
              reject('上传失败，请清空重新签名')
            }

          },error=>{
            reject('上传失败,请重试')
          })
        })
      },
      reset(){

        document.getElementById('qzq').contentWindow.clearcanvas()
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

      },
      closepp(){
        this.$parent.$parent.closepp()
      }

    }
  }
</script>

<style lang="scss" scoped>


  .qzban{
    position: absolute;
    top:0;left:0;bottom:0;right:0;
    height: 100%;
    width:100%;

  }
  .canvasqz{height:500px; position:relative; border:2px solid #DDD; overflow:hidden; margin-bottom: 20px;}
  .mint-popup-3 {
    background: none !important;
    width: 100%;
    height: 100%;
    .qzq {
      position: absolute;
      left:0;right:0;
      z-index: 9999;
      bottom: 0;
      background: #FFF;
      .qzqContent{
        padding:30px;
        .qzqbar{
          display: flex;
          .demoname{
            text-align: left;
            width:100%;
          }
          .clearname{
            text-align: right;
            width:100%;
            position: relative;
            top:-15px;
            i{display: inline-block;width:50px;img{width:100%;} position: relative; top:10px; margin-right:10px;}

          }

        }
      }
    }
  }
</style>
