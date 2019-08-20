
/**
 * 获取当前年度
 * @return {yyyy}
 */
export function getThisYear() {
  let time = new Date()
  let y = time.getFullYear()
  return y
}

/**
 * localStorage
 *
 */
export const storage = {
  set (key, val) {
    if (toString.call(val) === '[object String]' || typeof val === 'number') {
      localStorage.setItem(key, val)
    } else {
      localStorage.setItem(key, '') // 非字符串类型，按空字符串处理
    }
    
  },
  get (key) {
    return localStorage.getItem(key) || null
  },
  remove (key) {
    localStorage.removeItem(key)
  },
  clear () {
    localStorage.clear()
  }
}


/**
 * 获取url中参数
 * @param {*object} 传入对应key
 */
export function getUrlQuery(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = (window.location.search || storage.get('SEARCH')).substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

/**
 * 当前时间的秒时间戳
 */
export function getTimeStamp () {
  const ts = Date.parse(new Date()) + ''
  const t = ts.substr(0, ts.length - 3)
  return t
}
/**
 * function:将多层结构数据转换为url参数形式
 * @param data
 * @returns {Array}
 */

export function encodeUrl(data) {
  let paramsArray = []
  if (typeof data == "object") {
    let childData
    for (let item in data) {
      childData = encodeUrl(data[item]).map((childData) => `${item}=${childData}`)
      paramsArray = paramsArray.concat(childData)
    }
  } else {
    paramsArray.push(data)
  }
  return paramsArray
}

/**
 * function:判断设备 2为ios 1为安卓
 * @return 1/2
*/
export function iosOrAndroid() {
  let deviceType = 0
  let u = window.navigator.userAgent
  if (u.indexOf("Android") > -1 || u.indexOf("Adr") > -1) {
    deviceType = 1
  }
  if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    deviceType = 2
  }
  return deviceType
}

/**
 * function:判断是否是微信客户端
 * @return true/false
*/

export function isWeChat() {
  const u = window.navigator.userAgent
  return /MicroMessenger/i.test(u)
}