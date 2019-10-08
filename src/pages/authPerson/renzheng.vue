<template>
  <div>
    <div class="ptips">
      <!--请拍摄上传<span>张三</span>的身份证-->
      <p>国家要求网络运营者为在与用户签订协议或者提供服务时，用户需提供真实身份信息</p>
    </div>
    <elem ref="renzheng" configs="basicAuthPerson"></elem>
    <div class="wjpass" @click="goforget">身份证与手机不匹配时,请点此<b>找回账号</b></div>
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
      goforget(){


        localStorage.removeItem('is_auth')
        localStorage.removeItem('myphone')
        this.$router.push({
          path:'/authPerson',
          query:{
            funCode:'forgetPas',
            setp:1
          }
        })
      },
      gonext(){
        if(!this.$refs.renzheng.$children[0]._data.upimgfm || !this.$refs.renzheng.$children[0]._data.upimgzm){
          this.$toast('请上传身份证正反面进行验证')
        }else{

          localStorage.setItem('is_auth','0')
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
  .wjpass{
     text-align: center;
    color:#666;
    b{color:#ff4a02;}
  }
  .subc{
    padding:30px;
  }
  .ptips{
    text-align: center;
    padding:50px;
    padding-top: 50px;

    span{font-size:30px; color: #FF4A02;}
    font-size:30px;
    p{color:#999;font-size:25px;}
  }

</style>
