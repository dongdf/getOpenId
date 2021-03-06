/*
 @param : 传入秒级时间戳
 @逻辑 ：
	1分钟以前 显示'刚刚'
	1分钟~1小时之间 显示'xx分钟前'
	1小时~1天之间 显示'xx小时前'
	1天~1个月（31天）之间 显示'xx天前'
	大于1个月 显示'xx年xx月xx日'
*/

exports.time = function (dateTimeStamp) {

  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - parseInt(dateTimeStamp);
  if(diffValue < 0){return;}
  var monthC =diffValue/month;
  var weekC =diffValue/(7*day);
  var dayC =diffValue/day;
  var hourC =diffValue/hour;
  var minC =diffValue/minute;

  if(monthC>=1){

    var date = new Date(dateTimeStamp)
    var h = date.getHours();
    var m = date.getMinutes();
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    result = date.getFullYear() + '-' + month + '-' + day +'  '+PrefixInteger(h,2)+':'+PrefixInteger(m,2);
    // result="" + parseInt(monthC) + "月前";
  }
  else if(weekC>=1){
    // result="" + parseInt(weekC) + "周前";
    var date = new Date(dateTimeStamp)
    var h = date.getHours();
    var m = date.getMinutes();
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    result = date.getFullYear() + '-' + month + '-' + day +'  '+PrefixInteger(h,2)+':'+PrefixInteger(m,2);
  }
  else if(dayC>=1){
    result=""+ parseInt(dayC) +"天前";
  }
  else if(hourC>=1){
    result=""+ parseInt(hourC) +"小时前";
  }
  else if(minC>=1){
    result=""+ parseInt(minC) +"分钟前";
  }else{
    result="刚刚";
  }

  return result;


}
function PrefixInteger(num, n) {
  return (Array(n).join(0) + num).slice(-n);
}

exports.cut= function(all, numb){
  var org = (all+'').trim()
  var s = org.replace(/<[^<>]+?>/g,'');//删除所有HTML标签
  s=s.replace(/&nbsp;/gi,'');
  var cutted = ''
  if(s.length>numb){
     cutted = s.substr(0, numb)+'...';
  }else{
    cutted = s;
  }
  return cutted;
}

exports.filterAllhtml= function(all, numb){
  var org = (all+'').trim()
  var s = org.replace(/<[^<>]+?>/g,'');//删除所有HTML标签
  s=s.replace(/&nbsp;/gi,'');
  return s;
}

exports.cutrandom= function(all){
  var rans=Math.floor(Math.random()*(4-7+1)+7);
  var org = (all+'').trim()
  var s = org.replace(/<[^<>]+?>/g,'');//删除所有HTML标签
  s=s.replace(/&nbsp;/gi,'');
  var cutted = ''
  if(s.length>10){
    cutted = s.substr(0, rans);
  }else{
    cutted = s;
  }

  return cutted;
}


exports.cut2= function(all){
  var snumb = 20;
  var cutted = '';
  if(all.length>snumb){
    cutted = all.substr(0, snumb)+'...';
  }else{
    cutted = all;
  }
  return cutted
}

exports.timeNumb=function(date, fmt){
  let dates = new Date(parseInt(date));
  if (/(y+)/.test(fmt)) {

    fmt = fmt.replace(RegExp.$1, (dates.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': dates.getMonth() + 1,
    'd+': dates.getDate(),
    'h+': dates.getHours(),
    'm+': dates.getMinutes(),
    's+': dates.getSeconds()
  };

  // 遍历这个对象
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

exports.stars = function(count) {
  var html='';

  for(i=1;i<=5;i++){
    if(i<=count){
      html+=`<span class="light"></span>`;
    }else{
      html+=`<span class=""></span>`;
    }

  }
  return html;
}
exports.expertTags = function (str) {
  var html = '';
  if(!str){
    html = '';
  }else{
    var tagslist = str.split(',')
    for(var i in tagslist){
      html+=`<span style="background-color:#C98500;
        display: block;
        float:left;
        white-space:nowrap;
        color:#FFF;
        padding:2px 7px;
        font-size:12px;
        border-radius: 100px;
        margin-right:10px;
        margin-bottom:5px;
        
       ">`+tagslist[i]+`</span>`;
    }
  }
  return html;
}
exports.expertTags2 = function (str) {
  var html = '';
  if(!str){
    html = '';
  }else{
    var tagslist = str.split(',')
    for(var i in tagslist){
      html+=`<span style="
color: #A38A64;
                font-size: 12px;
                white-space:nowrap;
                height: 20px;
                line-height: 20px;
                display: block;
                margin:5px 2px;
                float: left;
                border: 1px solid #A38A64;
                border-radius: 17px;
                padding:0 10px;
                margin-right: 5px;
">`+tagslist[i]+`</span>`;
    }
  }
  return html;
}
exports.longtime = function(msd){

    var time = parseFloat(msd) / 1000;
    if (null != time && "" != time) {
      if (time > 60 && time < 60 * 60) {
        time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
          parseInt(time / 60.0)) * 60) + "秒";
      }
      else if (time >= 60 * 60 && time < 60 * 60 * 24) {
        time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
          parseInt(time / 3600.0)) * 60) + "分钟" +
          parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
            parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
      }
      else {
        time = parseInt(time) + "秒";
      }
    }
    return time;

}

exports.isphone =function (str) {
  let reg = /^(((14[0-9]{1})|(13[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  return reg.test(str)
}


exports.datef = function (time) {

  var d = new Date(time);
  var m =d.getMonth() + 1;
  m = m<10?('0'+m):m;
  var ds =  d.getDate();
  ds= ds<10?('0'+d):ds;
  var hs = d.getHours();
  hs= hs<10?('0'+d):hs;
  var ms = d.getMinutes();
  ms= ms<10?('0'+d):ms;

  var times=d.getFullYear() + '-' + m + '-' + ds + ' ' + hs + ':' + ms;
  return times

}

// 过滤手机号
exports.textFilterPhone = function (str) {
  // var sphone = str.trim();
  // var lphone =sphone.replace(/1[3,5,8,6,9,7]{1}[0-9]{9}/g,'1**********');
  return str
}

exports.cvtjson = function (str) {
  var c = JSON.parse(str);
  // console.log(c.content.title)
  // var d = JSON.parse(c.content);
  return c;
}
exports.relplaceA = function (str) {

  // var strtmp = Vue.$options.filters.filterAllhtml(nval)
  str = str+'';
  var re = /(http[s]?:\/\/([\w-]+.)+([:\d+])?([\w-\.\/\?%#&=]*)?)/gi;
  var s = str.replace(re,function(a){// href="'+a+'"
    return '<a  attrhref="'+a+'" style="color:#08F;" target=_blank>'+'点此查看'+'</a>';
  });
  return s;

}
exports.filterWidth = function(str){
  str= str+''
  // str=str.replace(/[ \t]*style[ \t]*=[ \t]*("[^"]+")|('[^']+')/ig,"");
  str=str.replace(/[ \t]*width[ \t]*=[ \t]*("[^"]+")|('[^']+')/ig,"");
  str=str.replace(/[ \t]*height[ \t]*=[ \t]*("[^"]+")|('[^']+')/ig,"");
  str=str.replace(/[ \t]*width[ \t]*=[ \t]*[^ \t]+/ig,"");
  str=str.replace(/[ \t]*height[ \t]*=[ \t]*[^ \t]+/ig,"");
  return str;
}
