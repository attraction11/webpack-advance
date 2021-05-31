/*
* @Author: cuijk
* @Date:   2017-10-08 16:12:49
* @Last Modified by:   cuijk
* @Last Modified time: 2017-10-14 12:51:38
*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 洗牌函数
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

// 延迟函数
export function debounce(func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 检测设备类型
export function deviceTest(elementId) {
  let browser = {
    versions: () => {
      const u = navigator.userAgent;
      // const app = navigator.appVersion;
      return {
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        iPhone: u.indexOf('iPhone') > -1,
        iPad: u.indexOf('iPad') > -1
      };
    }
  };
  if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
    this.$refs[elementId].id = 'deviceIos';
    console.log('IOS');
  }
  if (browser.versions.android) {
    this.$refs[elementId].id = '';
    console.log('and');
  }
  // this.$refs.noResultIcon.id = 'deviceIos';
}

/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return object {id:123456,a:b}
 */
export function urlParse(date, fmt) {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  // ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
}

// 格式化日期
function formatDate (date) {
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? `0${m}` : m;
  let d = date.getDate();
  d = d < 10 ? `0${d}` : d;
  return `${y}/${m}/${d}`;
}

// 格式化时间
function formTime (date) {
  let h = date.getHours();
  h = h < 10 ? `0${h}` : h;
  let m = date.getMinutes();
  m = m < 10 ? `0${m}` : m;
  let s = date.getSeconds();
  s = s < 10 ? `0${s}` : s;
  return `${h}:${m}:${s}`;
}

// 格式化日期
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

// 分隔数字
function splitNum(num) {

  if (!/\d+/.test(num)) throw Error('splitNum is not effective number')
  let nums = num = num.toString(),
    dotIndex = nums.indexOf('.');

  nums = nums.substring(0, dotIndex === -1 ? num.length : dotIndex)
    .split('')
    .reverse()
    .join('')

  return nums.replace(/(\d{3})/g, '$1,')
    .replace(/\,$/, '')
    .split('')
    .reverse()
    .join('') + (dotIndex >= 0 ? num.slice(dotIndex) : '')
}

// 拖动函数
function moveModal(event, modal) {
  const X = event.clientX; // 鼠标焦点距浏览器边缘的X距离；
  const Y = event.clientY; // 鼠标焦点距浏览器边缘的Y距离；
  document.onmousemove = (e) => {
    const l = e.clientX - X;
    const t = e.clientY - Y;
    modal.style.left = `${l}px`;
    modal.style.top = `${t}px`;
  };
  document.onmouseup = () => {
    document.onmousemove = null;
  };
}
