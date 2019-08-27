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
          title: '微信授权'
        }
      },{
        path: '/',
        name: 'home',
        component: (resolve)=>require(['../pages/hello'],resolve),
        meta: {
          title: '首页'
        }
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
