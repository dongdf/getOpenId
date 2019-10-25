import basicAuthPerson from './basicAuthPerson.vue'
import renzheng from './renzheng'
import forgetPas from './forgetPas'
import businessAuth from './businessAuth'
import suqianAuth from './suqianAuth'
import bisRange from './bisRange'
import contractList from './contractList'
import qianzi from './qianzi'
import personalAuth from './personalAuth'
import teamAuth from './teamAuth'
import bistypeRange from './bistypeRange'
import xieyi from './xieyi'
import idcardview from './idcardview'

window.addRouter({
  name: 'idcardview',
  title: '身份证预览',
  component: idcardview
})

window.addRouter({
  name: 'bistypeRange',
  title: '选择个体工商类型',
  component: bistypeRange
})
window.addRouter({
  name: 'basicAuthPerson',
  title: '身份证上传',
  component: basicAuthPerson
})
window.addRouter({
  name: 'renzheng',
  title: '身份认证',
  component: renzheng
})
window.addRouter({
  name: 'forgetPas',
  title: '找回账号',
  component: forgetPas
})
window.addRouter({
  name: 'businessAuth',
  title: '工商认证-创业宝',
  component: businessAuth
})
window.addRouter({
  name: 'suqianAuth',
  title: '工商认证-创业宝',
  component: suqianAuth
})
window.addRouter({
  name: 'personalAuth',
  title: '分工宝',
  component: personalAuth
})
window.addRouter({
  name: 'teamAuth',
  title: '用工宝',
  component: teamAuth
})
window.addRouter({
  name: 'bisRange',
  title: '经营范围',
  component: bisRange
})
window.addRouter({
  name: 'contractList',
  title: '合同预览',
  component: contractList
})
window.addRouter({
  name: 'qianzi',
  title: '签字',
  component: qianzi
})

window.addRouter({
  name: 'xieyi',
  title: '返佣协议',
  component: xieyi
})
