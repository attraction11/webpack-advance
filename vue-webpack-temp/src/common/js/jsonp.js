/*
* @Author: cuijk
* @Date:   2017-09-30 09:33:24
* @Last Modified by:   cuijk
* @Last Modified time: 2017-09-30 14:17:09
* @describe jsonp方法的promise封装
*/
import jsonpOriginal from 'jsonp'

// 封装原始jsonp函数
export default function jsonp(url, data, opts) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + parameter(data)

  return new Promise((resolve, reject) => {
    jsonpOriginal(url, opts, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

// 对新版jsonp函数data参数拼接到url
function parameter(data) {
  let url = ''
  for (let k in data) {
    const param = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(param)}`
  }
  return url ? url.substring(1) : ''
}