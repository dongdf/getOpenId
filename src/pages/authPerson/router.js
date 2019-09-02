import basicAuthPerson from './basicAuthPerson.vue'
import renzheng from './renzheng'
import forgetPas from './forgetPas'


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


