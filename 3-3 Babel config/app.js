import 'babel-polyfill'

let func = () => {}
const NUM = 45
let arr = [1, 2, 4]
let arrB = arr.map(item => item * 2)

arr.includes(8)

// babel-polyfill支持Set、Generator
// ES6中的数据结构
console.log('new Set(arrB)', new Set(arrB))
// ES7中生成器Generator
function* func() {

}
// 针对语法的转换采用@babel/preset-env
// 针对函数和方法采用babel-polyfill、babel-transform-runtime

// babel-polyfill 全局的垫片，为开发应用而准备，会全局污染
// 使用 npm install babel-polyfill -save    import 'babel-polyfill'

// babel-transform-runtime 局部的垫片，为开发框架而准备，避免全局污染
// 使用npm install babel-plugin-transform-runtime --save-dev    npm install babel-runtime --save    .babelrc
