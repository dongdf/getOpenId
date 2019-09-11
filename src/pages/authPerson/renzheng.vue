<template>
  <div>
    <div class="ptips">
      请拍摄上传<span>张三</span>的身份证
      <p>请上传该账户本人的身份证照片</p>
    </div>
    <elem ref="renzheng" configs="basicAuthPerson"></elem>
    <div class="subc">
      <button @click="gonext" class="main">提交</button>
    </div>
  </div>
</template>

<script>

  // import authperson from './basicAuthPerson'
  export default {
    name: "renzheng",
    data(){
      return{

      }
    },
    mounted(){

    },
    // components:{authperson},
    methods:{
      gonext(){
        if(!this.$refs.renzheng.$children[0]._data.upimgfm || !this.$refs.renzheng.$children[0]._data.upimgzm){
          this.$toast('请上传身份证正反面进行验证')
        }else{
          this.request.post('mapi/getCompanyList',{}).then(res=>{
            if(res.code == 0){
              this.$router.push({
                path:'/mine',
                query:{
                  funCode:"minfo"
                }
              })

            }else{
              this.$toast(res.msg)
            }

          },error=>{

            this.$messagebox({
              title: '提示',
              message: '认证失败',
              showCancelButton: false
            }).then(action => {
              location.reload()


            });


          })
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
  .subc{
    padding:30px;
  }
  .ptips{
    text-align: center;
    padding-top:50px;
    span{font-size:30px; color: #FF4A02;}
    font-size:30px;
    p{color:#999;font-size:25px;}
  }

</style>
