// const { AsyncParallelHook}  = require('tapable')
const AsyncParallelHook  = require('./AsyncParallelHook.js')


let hook = new AsyncParallelHook(['name', 'age'])

hook.tapAsync('fn1', function (name, age, callback) { 
    console.log('fn1--->', name, age)
    callback()
})

hook.tapAsync('fn2', function (name, age, callback) { 
    console.log('fn2--->', name, age)
    callback()
})

hook.callAsync('sjk', 50, function () {
    console.log('end~~~~~~')
})



/**
 * 归纳如何实现SyncHook?
 * 1、实例化 hook ， 定义 _x = [f1, f2, f3, ...]     taps = [{}, {}, {}, ...]
 * 2、实例调用 tap  核心是往 taps 上添加组装好的 对象 {}  以便后期调用 call 方法时，从 taps 上获取 argus 或 fn
 * 3、调用 call 方法  HookCodeFactory 中 通过 setup create 获取可执行的代码
 * 4、需要对 Hook   SyncHook   HookCodeFactory  的类实现
 */
