<template>
  <div id="auth">
    <!--<div class="broswerc" v-show="!iswbroswer">-->
       <!--&lt;!&ndash;<button @click="gowelogin">微信登录</button>&ndash;&gt;-->
    <!--</div>-->
    <!--<div v-show="iswbroswer">-->

      <!--<div style="text-align: center; padding-top:20%;">授权中...<br>请允许,否则无法正常访问</div>-->
      <!--<div style="text-align: center; color:#red;font-weight: bold; padding-top:20%;" v-show="shouquanShow">{{error}}</div>-->

    <!--</div>-->

  </div>
</template>

<script>

import {OPEN_AUTH_URL,REDIRECT_URL} from '@/constants'
import {isWeChat, storage} from '@/utils/tools'
import $http from '@/utils/http'
const uuidv1 = require('uuid/v1');
export default {
  data() {
    return {
      shouquanShow:false,
      iswbroswer:false,
      error:''
    }
  },
  methods: {
    gowelogin(){
      var r ='https://weixin.caiheshui.com/#/auth';
      location.href = 'https://open.weixin.qq.com/connect/qrconnect?appid=wx9fe31bc821500e8f&redirect_uri='+encodeURI(r)+'&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect'
    }
    //
  },
  mounted() {
    // alert('123')

    let that = this;
    var ua = navigator.userAgent.toLowerCase();
    // alert(ua)
    var isWeixin = ua.match(/MicroMessenger/i) == 'micromessenger';
    // if (isWeixin) {
    //   that.iswbroswer = true;
    // }else{
    //   that.iswbroswer = false;
    //
    //   // var s = uuidv1().replace(/-/g,'');
    //   var s = uuidv1();
    //   localStorage.setItem('UUID',s);
    //   var sorgPage = localStorage.getItem('llrouterUrl')?localStorage.getItem('llrouterUrl'):REDIRECT_URL;
    //   window.location.replace(sorgPage);
    //   return false;
    //
    // }

    function getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      var q = window.location.pathname.substr(1).match(reg_rewrite);
      if(r != null){
        return unescape(r[2]);
      }else if(q != null){
        return unescape(q[2]);
      }else{
        return '';
      }
    }
    function getUrlname(orgPage,name) {
      try{
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var pids = '';
        var temp;
        if(orgPage.split('?')[1]){
          if(orgPage.split('?')[1].match(reg)){
            temp=orgPage.split('?')[1].match(reg);
          }else{
            temp=orgPage.split('?')[2].match(reg);
          }
          // var temp=orgPage.split('?')[1].match(reg);
          if(temp != null){
            pids =  unescape(temp[2]);
          }else{
            pids='';
          }
          return pids;
        }
      }catch(err){
        return '';
      }
    }
    const code = getQueryString('code')?getQueryString('code'):this.$route.query.code;
    const los = localStorage.getItem('WX_UID');
    if(!los){
      if(code){
        var orgPage = localStorage.getItem('llrouterUrl')?localStorage.getItem('llrouterUrl'):REDIRECT_URL;
        var pids,mobile;

        if(orgPage.indexOf('fxopenid')>=0){
          pids = getUrlname(orgPage,'fxopenid');
        }
        if(orgPage.indexOf('mobile')>=0){
          mobile = getUrlname(orgPage,'mobile');
        }

        this.request.get('mapi/getOpenid',{code:code}).then(res => {
          // console.log(res.data);
          var gourl = localStorage.getItem('llrouterUrl') || '/#/mlogin'
          if(res.data.code == 0){
            // storage.set('USER_INFO', JSON.stringify(res.data.data))
            storage.set('WX_UID', res.openid)
            location.replace(gourl);
            return false;
            let page = localStorage.getItem('orgPage')?localStorage.getItem('orgPage'):'';
            let pageQuery = localStorage.getItem('boss')?localStorage.getItem('boss'):'';
            if(page){
              this.$router.push({name:page,query:{boss:pageQuery}});
            }else{
              window.location.replace(orgPage);
            }
          }else{
            this.shouquanShow = true;
            this.error = res.data;
          }
        },(e)=>{
          this.shouquanShow = true;
          this.error = '服务器开小差，请关闭后重新进入';

        })
      } else {
        window.location.replace(OPEN_AUTH_URL);
      }

    }else{
      this.$router.push({path:'/home'});
    }
  }
}
</script>

<style lang="scss">
#auth{
  .broswerc{
    text-align: center;
    button{
      border:none;
      background: #4caf50;
      color:#FFF;
      border-radius: 1000px;
      width:60%;
      padding:15px 0;

    }
  }
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;
  padding-top: 80px;

  .tip{
    color: #fff;
    padding: 20px;
    max-width: 200px;
    text-align: center;
    margin: auto;
    background-color: rgba(0,0,0,.6);
    border-radius: 8px;
  }
}
</style>
