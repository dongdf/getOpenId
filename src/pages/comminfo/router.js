import errorInfo from './errorInfo'
import succesInfo from './succesInfo'


window.addRouter({
  name:'errorInfo',
  title:'错误提示',
  component:errorInfo
})
window.addRouter({
  name:'succesInfo',
  title:'正确提示',
  component:succesInfo
})

