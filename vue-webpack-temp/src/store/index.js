/*
* @Author: cuijk
* @Date:   2017-10-04 13:05:27
* @Last Modified by:   cuijk
* @Last Modified time: 2017-10-04 18:52:04
* @describe vuex入口文件
*/
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// 在浏览器控制台打印state修改日志
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
// 开启调试工具
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
