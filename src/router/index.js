import Vue from 'vue'
import Router from 'vue-router'
import beforeEach from './beforeEach'
// import afterEach from './afterEach'
Vue.use(Router)

const router = new Router({
    // mode: 'history',
  saveScrollPosition:true,
    routes: [
      {
        path: '/auth',
        name: 'Auth',
        component: (resolve)=>require(['../pages/auth'],resolve),
        meta: {
          title: '正在跳转...'
        }
      },{
        path: '/',
        redirect: '/mlogin'
      },{
        path: '/test',
        name: 'test',
        component: (resolve)=>require(['../pages/testdemo/index'],resolve),
        meta: {
          title: '首页'
        }
      },{
        path: '/mlogin',
        name: 'mlogin',
        component: (resolve)=>require(['../pages/mlogin'],resolve),
        meta: {
          title: '用户登录'
        }
      },{
        path: '/mine',
        name: 'mine',
        component: (resolve)=>require(['../pages/mine/index'],resolve),
        meta: {
          title: '个人中心'
        }
      },{
        path: '/authPerson',
        name: 'authPerson',
        component: (resolve)=>require(['../pages/authPerson/index'],resolve),
        meta: {
          title: '身份认证'
        }
      }

    ]
})

router.beforeEach(beforeEach);
router.afterEach((to, from)=>{
  if(to.meta.keepAlive){
    if(sessionStorage.getItem('srheight')){
      setTimeout(()=>{
        $(document).scrollTop(localStorage.getItem('srheight'));
      },200)
    }
  }


});

export default router
