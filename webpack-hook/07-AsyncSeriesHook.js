const { AsyncSeriesHook } = require('tapable')

let hook = new AsyncSeriesHook(['name'])

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