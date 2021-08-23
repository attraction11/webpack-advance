const { SyncWaterfallHook } = require('tapable')

// 瀑布钩子执行特点是上一个钩子的返回值，可以作为下一个钩子的参数传入
let hook = new SyncWaterfallHook(['name', 'age'])

hook.tap('fn1', function (name, age) { 
    console.log('fn1', name, age)
    return 'ret1'
})

hook.tap('fn2', function (name, age) { 
    console.log('fn2', name, age)
    return 'ret2'
})

hook.tap('fn3', function (name, age) { 
    console.log('fn3', name, age)
    return 'ret3'
})

hook.call('lg', 50)