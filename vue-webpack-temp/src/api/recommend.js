/*
* @Author: cuijk
* @Date:   2017-09-30 10:52:44
* @Last Modified by:   cuijk
* @Last Modified time: 2017-10-10 16:54:23
* @describe 调用jsonp 方法抓取QQ音乐线上的数据
*/
import jsonp from 'common/js/jsonp'
// import ajax from 'common/js/ajax'
import {commonParams, options} from './config'
import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
  // return ajax.get(url, data, fn)
}

export function getDiscList() {
  const url = debug ? '/api/getDiscList' : 'http://127.0.0.1:9000/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongList(disstid) {
  const url = debug ? '/api/getCdInfo' : 'http://127.0.0.1:9000/api/getCdInfo'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
