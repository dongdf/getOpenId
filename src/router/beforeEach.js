import {isWeChat, storage} from '@/utils/tools'
import {OPEN_AUTH_URL} from '@/constants'
import Vue from 'vue'
import Router from 'vue-router'
const beforeEach = (to, from, next) => {

  var title = to.meta.title




  document.title = title;

  const WX_UID = storage.get('WX_UID');
  var ss = window.location;
  if(!WX_UID){
    if(/^(Auth|invitation|TestCourseDetail|apply)$/.test(to.name)){
      next();
    }else{
      if(!getQueryString('code')){
        localStorage.setItem('llrouterUrl',ss);
      }
      // localStorage.setItem('furl',to.name);
      console.log('4'+'else')
      next({path:'/auth',query:{orgiPage:from.name}});

    }
  }else{

    var is_auth  = localStorage.getItem('is_auth') || ''
    if(is_auth == ''){
      if(to.name == 'mlogin' || to.query.funCode == 'forgetPas'){
        next()
      }else {
        next({path:'/mlogin'})
      }

    }else if(is_auth == 0){
      if(to.name == 'mlogin' || to.name == 'nlogin'){
        next({path:'/mine',query:{funCode:'minfo'}});
      }else{
        next()
      }
    } else if(is_auth == 1){

      if(to.query.funCode == 'renzheng' || to.query.funCode == 'forgetPas'){
        next()
      }else{
        var m = localStorage.getItem('myphone') || ''
        next({path:'/authPerson',query:{funCode:'renzheng',phone:m}});
      }

    }
  }

}

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

export default beforeEach
