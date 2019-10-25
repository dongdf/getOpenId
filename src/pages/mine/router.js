import qyts from './qyts'
import success from './success'
import error from './error'
import modifyCom from './modifyCom'
import minfo from './minfo'
import selectCompany from './selectCompany'
import contractnameList from './contractnameList'
import myContract from './myContract'

window.addRouter({
  name: 'qyts',
  title: '签约提示',
  component: qyts
})
window.addRouter({
  name: 'success',
  title: '视频上传成功提示',
  component: success
})
window.addRouter({
  name: 'error',
  title: '视频上传错误提示',
  component: error
})
window.addRouter({
  name: 'modifyCom',
  title: '修改公司名称',
  component: modifyCom
})
window.addRouter({
  name: 'minfo',
  title: '个人中心',
  component: minfo
})
window.addRouter({
  name: 'selectCompany',
  title: '选择公司',
  component: selectCompany
})
window.addRouter({
  name: 'contractnameList',
  title: '合同列表',
  component: contractnameList
})
window.addRouter({
  name: 'myContract',
  title: '我的合同',
  component: myContract
})
