import qyts from './qyts'
import modifyCom from './modifyCom'


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

