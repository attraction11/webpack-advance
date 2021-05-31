// Escape to the ES6 API (patch)
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueTouch from 'vue-touch'
import VueLazyload from 'vue-lazyload'
// Import the public CSS style
import 'common/stylus/index.styl'

/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

Vue.use(VueTouch, {name: 'v-touch'})

// 初始化 Test vConsole
// console.log('Hello world')

// Close production mode to give the prompt
Vue.config.productionTip = false

// Solve the problem of pressing 300ms on the mobile end
fastclick.attach(document.body)

// Use image lazy loading with some options
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
