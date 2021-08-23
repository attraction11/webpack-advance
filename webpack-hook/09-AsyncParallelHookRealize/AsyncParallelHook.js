let Hook = require('./Hook.js')

class HookCodeFactory {
    args ({ after, before } = {}) {
        let allArgs = this.options.args
        if (before) allArgs = [before].concat(allArgs)
        if (after) allArgs = allArgs.concat(after)
        return allArgs.join(',') // ['name', 'age'] ---> name, age
    }
    head () {
        return `"use strict";var _counter;var _x = this._x;`
    }
    content () {
        let code = `var _counter = ${this.options.taps.length};var _done = (function () { _callback(); });`
        for (var i = 0; i < this.options.taps.length; i++) {
            code += `var _fn${i} = _x[${i}]; _fn${i}(name, age, (function () {
                if (-- _counter === 0) _done();
            }));`
        }
        return code
    }
    setup (instance, options) { // 准备后续需要使用的数据
        this.options = options // 在源码中通过 init 方法实现， 当前直接简写
        instance._x = options.taps.map(o => o.fn) // this._x = [f1, f2, f3, ...]
    }
    create () { // 创建一段可执行的代码体 并返回
        let fn
        // fn = new Function("name, age", "var _x = this._x, var _fn0 = _x[0]; _fn0(name, age)")

        fn = new Function(
            this.args({
                after: '_callback'
            }),
            this.head() + this.content()
        )
        return fn
    }
}

let factory = new HookCodeFactory()

class AsyncParallelHook extends Hook {
    constructor(args) {
        super(args)
    }

    compile (options) { // options的值 { taps: [{}, {}], args: [name, age]}
        factory.setup(this, options)
        return factory.create(options)
    }
}

module.exports = AsyncParallelHook