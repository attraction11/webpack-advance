// 01、采用 cms 导入内容
// let name = require('./login')
// console.log('index.js内容执行了')
// console.log(name)

// 02、采用 esm 导入内容
// import name, { age } from './login.js'
// console.log('index.js内容执行了')
// console.log(name, '---->')
// console.log(age, '---->')

// 03、点击动态加载
let oBtn = document.getElementById('btn')
oBtn.addEventListener('click', function () { 
    import(/*webpackChunkName: "login"*/ './login.js').then(login => { 
        console.log(login)
    })
})

console.log('index.js内容执行了')

// 04、分析t方法的实现
// let name = require('./login.js')

// console.log('index.js执行')

// console.log(name)

