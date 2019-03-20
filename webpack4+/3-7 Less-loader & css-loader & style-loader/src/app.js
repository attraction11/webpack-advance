import base from './css/base.less'
import common from './css/common.less'

var app = document.getElementById('app');

// css Modules 的引用方法
app.innerHTML = '<div class="'+ base.box +'"></div>'

import(/* webpackChunkName:'a' */ './components/a').then(function(a) {
    console.log(a)
})

var flag = true;

