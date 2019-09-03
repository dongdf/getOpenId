import qyts from './qyts'
import modifyCom from './modifyCom'
import minfo from './minfo'
import selectCompany from './selectCompany'


window.addRouter({
  name:'qyts',
  title:'签约提示',
  component:qyts
})
window.addRouter({
  name:'modifyCom',
  title:'修改公司名称',
  component:modifyCom
})
window.addRouter({
  name:'minfo',
  title:'个人中心',
  component:minfo
})
window.addRouter({
  name:'selectCompany',
  title:'选择公司',
  component:selectCompany
})
