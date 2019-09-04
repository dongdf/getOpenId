import {isWeChat, storage} from '@/utils/tools'
import {OPEN_AUTH_URL} from '@/constants'
import Vue from 'vue'
import Router from 'vue-router'
const beforeEach = (to, from, next) => {

  const title = to.meta.title
  document.title = title;

  const WX_UID = storage.get('WX_UID');
  var ss = window.location;
  if(!WX_UID){
    if(/^(Auth|invitation|TestCourseDetail|apply)$/.test(to.name)){
      console.log(/^(Auth|invitation|apply)$/.test(to.name))
      next();
    }else{
      if(!getQueryString('code')){
        localStorage.setItem('llrouterUrl',ss);
      }
      // localStorage.setItem('furl',to.name);
      console.log('4'+'else')
      next({path:'/auth',query:{orgiPage:from.name}});

    }
  }
  if(from.meta.keepAlive){
    var scrollHeight=$(document).scrollTop();
    if(scrollHeight != 0){
      sessionStorage.setItem('srheight',scrollHeight);
    }
  }
  next();
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
