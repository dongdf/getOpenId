import Vue from 'vue'
import App from './App'
import router from './router'
import http from '@/utils/http'
import filters from '@/filters/index.js'
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import './assets/scss/app.scss'

import './assets/scss/weiui.scss'
Vue.use(MintUI);





Vue.prototype.$http = http
Object.keys(filters).forEach(k => Vue.filter(k,filters[k]));

Vue.config.productionTip = false





// 组件安装

let rous = router.options.routes;
window.allRoutes=[];
getroutes(rous)
function getroutes(rous) {

  rous.forEach(v=>{
    if(v.children){
      getroutes(v.children)
    }else{
      window.allRoutes.push(v)
    }

  })
}

window.addRouter = function (obj) {
  window.allRoutes.push(obj)
}
window.getRouter = function (str) {
  let com = window.allRoutes.filter(item => item.name=== str);
  if(com.length>0){
    return com[0]
  }else{
    console.warn('未找到组件')
  }

}
import card from './components/card.vue'
Vue.prototype.$card=function (config) {
  let instance =new Vue({
    render:function (createElement) {
      return createElement(card,{
        props:config
      })
    },
  })
  instance.$mount()
  document.body.appendChild(instance.$el)
}
import promot from './components/promot.vue'
Vue.prototype.$promot=function (config) {
  let instance =new Vue({
    render:function (createElement) {
      return createElement(promot,{
        props:config
      })
    },
  })
  instance.$mount()
  document.body.appendChild(instance.$el)
}


Vue.component('elem',{
  props: {
    configs: null
  },
  render:function (createElement) {
    const rous = router.options.routes;
    let _props = this.$attrs;
    let com = window.allRoutes.filter(item => item.name === this.configs);

     // console.log(this.configs);
    if(com.length>0){
      return createElement(com[0].component,{
        props: _props
      });
    }else {
      console.warn('未找到组件')
    }

  }

})


// 组件安装

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
