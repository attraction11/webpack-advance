const { AsyncParallelBailHook } = require('tapable')

let hook = new AsyncParallelBailHook(['name'])

console.time('time')
hook.tapAsync('fn1', function (name, callback) {
    setTimeout(() => {
        console.log('fn1--->', name)
        callback()
    }, 1000)
})

hook.tapAsync('fn2', function (name, callback) {
    setTimeout(() => {
        console.log('fn2--->', name)
        callback('err')
    }, 2000)
})

hook.tapAsync('fn3', function (name, callback) {
    setTimeout(() => {
        console.log('fn3--->', name)
        callback()
    }, 3000)
})

hook.callAsync('sjk', function () {
    console.log('执行了回调操作~')
    console.timeEnd('time')
})