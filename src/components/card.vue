<template>
  <div>
    <div id="containers" ref="cards"  @click="close()" class="blackfixed"></div>
      <div data-v-5c8289c0="" ref="carsContent"  >
        <div  class="popw"    :style="{width:width}">
          <div class="el-dialog__header"><span class="el-dialog__title">{{title}}</span>
            <label @click="close" type="button"   class="el-dialog__headerbtn"><i
              class="el-dialog__close el-icon el-icon-close"><img src="../assets/img/close.png"/> </i></label>
          </div>
          <div class="el-dialog__body">
            <div id="bodyContent" ref="bodyContent"></div>
          </div>
        </div>
      </div>

  </div>




</template>

<script>
  import Vue from 'vue'
  export default {

    name: "card",
    props:['width','title','height','props','funCode','callback'],
    data(){
      return{
        centerDialogVisible:true,

      }
    },
    created(){
      this.$nextTick(()=>{
        this.render()
        document.body.style.overflow='hidden'
      })



    },
    methods:{
      render(){
        let vm = this;
        var com = window.getRouter(this.funCode);
        console.log(com)
        com.component.methods.callback = function (obj={}) {
          if(vm.callback){
            vm.callback(vm.close,obj)
          }
        }
        com.component.methods.close = function () {
          vm.close()
        }
        var app= Vue.extend({
          render:function (createElement) {
            return createElement(com.component,{
              props: vm.props
            });
          }
        })
        new app().$mount('#bodyContent')
        setTimeout(()=>{
          // document.getElementById('containers').style.opacity="1"
          this.$refs.cards.style.opacity="1"
          // this.$refs.carsContent.style.top="0"

        })

      },


      close(){
        document.body.style.overflow='auto'

        this.$destroy()
        this.$el.remove();

      },

    }
  }
</script>

<style  lang="scss"  scoped>
  /*.el-dialog__wrapper{*/
    /*transition: all 200ms;*/
    /*top:-100%;*/
  /*}*/
 #bodyContent{
   max-height: 500px;
   overflow: auto;
 }
  .el-dialog__body{
    position: relative;
    height:100%;

  }
  .popw{
    background: #FFF;
    position: fixed;
    right:0;top:0px;
    padding:20px;
    bottom:0;
    overflow: auto;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    z-index: 99;
  }
  .el-dialog__header{
    width:100%;
    z-index: 99;
    border-bottom: 1px solid #DDD;
    padding:20px;
     background: #FFF;
    top:0;left:0;
    padding-top:0;
    text-align: center;
    position: relative;
    .el-icon-close{
      position: absolute;
      left:10px;top:0px;
      width:40px;height:40px;
      img{width:100%; opacity: .8}
    }
  }
  .blackfixed{
    background:rgba(0,0,0,.5);
    width:100%;height:100%;
    top:0;
    opacity:0;
    position:fixed;
    left:0;
    z-index:9;
    transition: all 200ms;

  }
</style>
