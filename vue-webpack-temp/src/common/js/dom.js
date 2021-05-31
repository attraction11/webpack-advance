/*
* @Author: cuijk
* @Date:   2017-09-30 15:47:15
* @Last Modified by:   cuijk
* @Last Modified time: 2017-10-05 12:17:19
* @describe 操作DOM的一些方法的封装
*/

// 检测DOM元素是否有某class属性
export function hasClass(el, className) {
  // 匹配规则：classname 前后有无空格或以classname开始
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

// 给DOM元素添加class属性
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  // 字符串转数组
  let newClass = el.className.split(' ')
  newClass.push(className)
  // 数组转字符串
  el.className = newClass.join(' ')
}

// 给DOM元素设置、添加属性
export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

// 给CCS属性添加浏览器厂商前缀
let elementStyle = document.createElement('div').style
// 获取浏览器供应商前缀
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }
  // charAt() 方法可返回指定位置的字符
  // substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
