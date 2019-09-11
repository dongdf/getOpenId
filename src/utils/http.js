
import axios from 'axios'
import {OPEN_AUTH_URL} from '@/constants'
import { HOST } from '@/constants'
import {storage} from '@/utils/tools'

import qs from 'qs'
const Axios = axios.create({
  baseURL:HOST,//http://192.168.1.210:16001
  withCredentials:false,
  // responseType: 'json', // default
  transformResponse: [function (data) {
    return data
  }],
  timeout: 30000
})

import md5 from 'js-md5';

// let Axios = axios.create({
//   //baseURL: localhost,
//   withCredentials: true,
//   responseType: 'json', // default
//   transformResponse: [function (data) {
//     return data
//   }],
//   timeout: 30000
// })

var openid  = localStorage.getItem('WX_UID') || ''
var openToken  = md5('renshe_member_'+openid)

//http://192.168.69.114:16401/knowledge/knowledgeTypes

Axios.interceptors.request.use(config => {

  //config.headers['WX_UID'] = localStorage.getItem('WX_UID') || ''

  // config.headers['WX-UID'] = localStorage.getItem('WX_UID') || ''
  // config.headers['UUID'] = localStorage.getItem('UUID') || ''
  // config.headers['x_token'] = localStorage.getItem('UUID') || ''
  //config.headers['reqType'] = 'chsWechat'

  // var openid  = localStorage.getItem('WX_UID') || ''
  // var openToken  = md5('renshe_member_'+openid)
  // console.log(openToken)
  if(config.method == 'post'){
    if(config.data){
      config.data.token = openToken;
      config.data.openid= openid;
      config.data = qs.stringify(config.data)

    }
  }
  // config.headers['Content-Type'] = 'application/json'
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  // console.log(config)
  return config
}, error => {
  return Promise.reject(error)
})





// Axios.interceptors.response.use(response => {
//   if(response.data.code == 99){
//     storage.clear()
//     window.location.replace(OPEN_AUTH_URL)
//   }
//   return Promise.resolve(response.data)
// }, error => {
//   return Promise.reject(error.response)
// })

export default Axios
