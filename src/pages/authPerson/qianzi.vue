<template>
  <mt-popup v-model="showQz"      position="bottom" class="mint-popup-3" :modal="true">

    <div class="qzq">
      <div class="qzqContent">

        <div class="qzqbar">
          <div class="demoname">签名:往事随风</div>
          <div class="clearname" style="text-align: center"><i><img src="../../assets/img/clearname.jpg"/> </i>清除 </div>
          <div class="demoname" style="text-align: right" @click="closepp"> 关闭 </div>

        </div>
        <div class="canvasqz">

          <canvas id="canvas" width="300" height="150">

          </canvas>
          <div class="btn">
            <span @click="toClear()">清除</span>
            <span @click="toSave()">保存</span>
          </div>




        </div>
        <div>
          <button class="main" @click="closepp">立即签约(6)</button>
        </div>
      </div>
    </div>
  </mt-popup>
</template>

<script>

  export default {
    props:['showQz'],
    name: "qianzi",
    data(){
      return {
        ctx:null,
        canvas:null
      }
    },
    mounted() {
      this.initPage()
    },
    methods:{
      closepp(){

        this.$parent.$parent.closepp()
      },
      initPage() {
        this.canvas = document.getElementById('canvas')
        if(this.canvas.getContext){
          this.ctx = this.canvas.getContext('2d')
          let background = "#ffffff"
          this.ctx.lineCap = 'round'
          this.ctx.fillStyle = background
          this.ctx.lineWidth = 2
          this.ctx.fillRect(0,0,350,150)

          this.canvas.addEventListener("touchstart",(e)=>{
            console.log(123,e)
            this.ctx.beginPath()
            this.ctx.moveTo(e.changedTouches[0].pageX,e.changedTouches[0].pageY)
          })

          this.canvas.addEventListener("touchmove",(e)=>{
            this.ctx.lineTo(e.changedTouches[0].pageX,e.changedTouches[0].pageY)
            this.ctx.stroke()
          })

        }
      },
      toClear() {
        this.ctx.clearRect(0,0,300,150)
      },
      toSave() {
        let base64Img = this.canvas.toDataURL()
        console.log(123,base64Img)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #canvas {
    width: 100%;
    height: 100%;
    position: relative;
  }
  #canvas canvas {
    display: block;
  }

  .canvasqz{height:500px;border:2px solid #DDD; margin-bottom: 20px;}
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
