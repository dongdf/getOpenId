<template>
  <div>
    <div id="containers" ref="containers" data-v-5c8289c0=""  class="blackfixed"></div>
      <div class="promotContent" ref="promotc" id="promotContent"  :style="{width:width,right:mleft}">
        <!--<div class="el-dialog__header"><span class="el-dialog__title">{{title}}</span>-->
          <!--<button @click="close" type="button" aria-label="Close" class="el-dialog__headerbtn"><i-->
            <!--class="el-dialog__close el-icon el-icon-close"><img src="../assets/img/close.png"/></i></button>-->
        <!--</div>-->
        <div class="el-dialog__body">
          <div id="bodyContent" ref="bodyContent"></div>
        </div>
        <div class="closeicons" v-show="props.isableclose">
          <img @click="close()" src="../assets/img/closeicon.png"/>
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
        mleft:0,

      }
    },
    mounted(){
      this.mleft = (100-parseInt(this.width))/2+'%'
      this.$nextTick(()=>{
        this.render()
      })
    },
    // watch:{
    //   width(nval,oval){
    //     console.log(nval)
    //   }
    // },
    methods:{
      render:function(){
        let vm = this;
        var com = window.getRouter(this.funCode);
        com.component.methods.callback =function (obj={}) {
          if(vm.callback){
            vm.callback(vm.close,obj)
          }
        }
        com.component.methods.close =function () {
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
          this.$refs.containers.style.opacity="1"
          // document.getElementById('containers').style.opacity="1"
          // document.getElementById('promotContent').style.right="0"
        })

      },


      close(){

        this.$destroy()
        this.$el.remove();

      },

    }
  }
</script>

<style lang="scss"   scoped>
  .promotContent{
    background:#FFF;
    position: absolute;
    border-radius: 20px;
    top:15%;
    padding:30px;

    z-index:999;

    transition: all 200ms;
    .el-dialog__header{
      padding:15px;
      padding-top:0;
      border-bottom: 1px solid #DDD;
      margin-bottom:10px;
      position: relative;
      .el-icon-close{
        position: absolute;
        width:40px;
        img{width:100%; opacity: .8}
        right: 10px;
        top:0;

      }

    }
    .closeicons{
      position: absolute;
      bottom:-150px;
      color:#FFF;

      width:60px;height:60px;
      left:50%;
      margin-left:-20px;
      img{width:100%; opacity: .7}

    }
  }
 #bodyContent{
   max-height: 500px;
   overflow: auto;
 }
  .blackfixed{
    background:rgba(0,0,0,.7);
    width:100%;height:100%;
    top:0;
    opacity: 0;
    position:fixed;
    left:0;
    z-index:9;
    transition: all 200ms;

  }
</style>
