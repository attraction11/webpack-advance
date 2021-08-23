const { AsyncParallelHook } = require('tapable')

let hook = new AsyncParallelHook(['name'])

// 对于异步钩子的使用，在添加事件监听的时候有三种方式： tap  tapAsync tapPromise
// 1、tap方式添加事件监听
// hook.tap('fn1', function (name) { 
//     console.log('fn1--->', name)
// })

// hook.tap('fn2', function (name) { 
//     console.log('fn2--->', name)
// })

// hook.callAsync('sjk', function () { 
//     console.log('执行了回调操作~')
// })


// 2、tapAsync方式添加事件监听
// console.time('time')
// hook.tapAsync('fn1', function (name, callback) { 
//     setTimeout(() => {
//         console.log('fn1--->', name)
//         callback()
//      }, 1000)
// })

// hook.tapAsync('fn2', function (name, callback) { 
//     setTimeout(() => {
//         console.log('fn2--->', name)
//         callback()
//      }, 2000)
// })

// hook.callAsync('sjk', function () { 
//     console.log('执行了回调操作~')
//     console.timeEnd('time')
// })


// 3、tapPromise方式添加事件监听
console.time('time')
hook.tapPromise('fn1', function (name) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log('fn1--->', name)
            resolve()
        }, 1000)
    })
})

hook.tapPromise('fn2', function (name) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log('fn2--->', name)
            resolve()
        }, 2000)
    })
})

hook.promise('sjk').then(() => {
    console.log('执行了~')
    console.timeEnd('time')
})