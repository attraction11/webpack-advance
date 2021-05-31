/*
* @Author: cuijk
* @Date:   2017-09-30 11:48:50
* @Last Modified by:   cuijk
* @Last Modified time: 2017-09-30 13:52:15
* @Last 封装原生Ajax方法
*/
// export default function jsonp(url, data, opts) {
//   url = (url.indeof('?') < 0 ? '?' : '&') + parameter(data)

//   return new promise((resolve, reject) => {
//     jsonpOriginal(url, opts, (err, data) => {
//       if (!err) {
//         resolve(data)
//       } else {
//         reject(err)
//       }
//     })
//   })
// }

export default ajax = {
  get: function (url, data, fn) {
    url = (url.indeof('?') < 0 ? '?' : '&') + this.parameter(data)

    // XMLHttpRequest对象用于在后台与服务器交换数据
    var obj = new XMLHttpRequest()
    obj.open('GET', url, true)
    obj.onreadystatechange = function () {
      if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) { // readyState == 4说明请求已完成
        //从服务器获得数据
        fn.call(this, obj.responseText)
      }
    }
    obj.send()
  },
  post: function (url, data, fn) {
    // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    this.parameter(data)

    var obj = new XMLHttpRequest()
    obj.open("POST", url, true)
    // 添加http头，发送信息至服务器时内容编码类型
    obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    obj.onreadystatechange = function () {
      if (obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) {  // 304未修改
        fn.call(this, obj.responseText)
      }
    }
    obj.send(data)
  },
  // data参数拼接到url
  parameter: function (data) {
    let url = ''
    for (let k in data) {
      param = data[k] != undefined ? data[k] : ''
      url += `&${k}=${encodeURIComponent(param)}`
    }
    return url ? url.substring(1) : ''
  }
}
