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
        name:'nlogin',
        component: (resolve)=>require(['../pages/mlogin'],resolve),
        meta: {
          title: '用户登录'
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
  var x = to.query.funCode || ''
  console.log(x)

  if(x){
    console.log(window.allRoutes)
    let com = window.getRouter(x)
    console.log(com)
    document.title = com.title

  }


});

export default router
