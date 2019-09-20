
import axios from 'axios'
import {OPEN_AUTH_URL} from '@/constants'
import { HOST } from '@/constants'
import {storage} from '@/utils/tools'
import md5 from "js-md5";

import { Indicator } from 'mint-ui';

var openid  = localStorage.getItem('WX_UID') || ''
var openToken  = md5('renshe_member_'+openid)
var myphone = localStorage.getItem('myphone') || ''
const Axios={}
Axios.post = function (url,data={}) {

  return new Promise((resolve,reject)=> {
    data.openid = openid;
    data.token = openToken;
    data.phonetoken = myphone
    if(!data.cmloading){
      Indicator.open()
    }else{
      delete data['cmloading']
    }

    $.ajax({
      //请求方式
      type : "POST",
      //请求的媒体类型
      // contentType: "application/json;charset=UTF-8",
      //请求地址
      url : HOST + url,
      //数据，json字符串
      data:data,
      //请求成功
      success : function(result) {
        // document.getElementById('loading').style = 'none'
        setTimeout(()=>{
          Indicator.close()
        },200)
        resolve(result)
      },
      //请求失败，包含具体的错误信息
      error : function(e){
        setTimeout(()=>{
          Indicator.close()
        },200)
        reject(e)
      }
    });

  })


}

Axios.get = function (url,data={}) {

  return new Promise((resolve,reject)=> {
    // data.openid = openid;
    // data.token = openToken

    $.ajax({
      //请求方式
      type : "GET",
      //请求的媒体类型
      // contentType: "application/json;charset=UTF-8",
      //请求地址
      url : HOST + url,
      //数据，json字符串
      data:data,
      //请求成功
      success : function(result) {

        resolve(result)

      },
      //请求失败，包含具体的错误信息
      error : function(e){

        reject(e)

      }
    });

  })


}




export default Axios
