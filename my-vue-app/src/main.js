// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 选择项目使用的组件库并添加全局翻译文件（可选）
import ElementUI from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import { i18n, language } from '@/utils/locale'
Vue.use(ElementUI, { locale: language === 'en' ? enLocale : zhLocale })

// 导入公用的文件
import '@/utils/importJs'
import './icons'

// 一个现代的替代CSS重置
import 'normalize.css/normalize.css'

// 导入并注册全局自定义指令
import * as directives from './directives'
Object.keys(directives).forEach(k => Vue.directive(k, directives[k]))

// 导入并注册全局过滤函数
import * as filters from './filters'
Object.keys(filters).forEach((key) => { Vue.filter(key, filters[key]) })

// 导入并添加全局调用函数
import vmsMessage from '@/utils/vmsMessage'
Vue.prototype.$vmsMessage = vmsMessage

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    template: '<App/>',
    components: { App },
})
