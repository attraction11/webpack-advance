/*
* @Author: cuijk
* @Date:   2017-09-30 10:56:46
* @Last Modified by:   cuijk
* @Last Modified time: 2017-10-17 23:00:50
* @describe jsonp 方法公共参数的配置
*/
// 常量请求参数
export const commonParams = {
  g_tk: 1928093487,
  format: 'jsonp',
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0
}

// 设置jsop回调函数名称
export const options = {
  param: 'jsonpCallback',
  prefix: 'jp'
}

// 正常返回状态码
export const ERR_OK = 0