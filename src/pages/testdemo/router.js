import eleDom from './eleDom'
import fun from './fun'
import cardAndPromot from './cardAndPromot'

window.addRouter({
  name:'cardAndPromot',
  title:'测试弹框',
  component:cardAndPromot
})
window.addRouter({
  name:'fun',
  title:'fun',
  component:fun
})
window.addRouter({
  name:'eleDom',
  title:'eleDom',
  component:eleDom
})
