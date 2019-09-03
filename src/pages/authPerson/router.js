import basicAuthPerson from './basicAuthPerson.vue'
import renzheng from './renzheng'
import forgetPas from './forgetPas'
import businessAuth from './businessAuth'
import bisRange from './bisRange'



window.addRouter({
  name:'basicAuthPerson',
  title:'身份证上传',
  component:basicAuthPerson
})
window.addRouter({
  name:'renzheng',
  title:'身份认证',
  component:renzheng
})
window.addRouter({
  name:'forgetPas',
  title:'找回密码',
  component:forgetPas
})
window.addRouter({
  name:'businessAuth',
  title:'工商认证',
  component:businessAuth
})
window.addRouter({
  name:'bisRange',
  title:'经营范围',
  component:bisRange
})



