const { SyncBailHook } = require('tapable')

// 熔断钩子是一个流水线、若其中一个钩子 return 非 undefined 则后续钩子无法执行
let hook = new SyncBailHook(['name', 'age'])

hook.tap('fn1', function (name, age) { 
    console.log('fn1', name, age)
})

hook.tap('fn2', function (name, age) { 
    console.log('fn2', name, age)
    // return 'ret2'
    return undefined
})

hook.tap('fn3', function (name, age) { 
    console.log('fn3', name, age)
})

hook.call('lg', 100)