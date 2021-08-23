let Hook = require('./Hook.js')

class HookCodeFactory { 
    args () { 
        return this.options.args.join(',') // ['name', 'age'] ---> name, age
    }
    head () { 
        return `var _x = this._x;`
    }
    content () { 
        let code = ``
        for (var i = 0; i < this.options.taps.length; i++) { 
            code += `var _fn${i} = _x[${i}]; _fn${i}(${this.args()});`
        }
        return code
    }
    setup (instance, options) { // 准备后续需要使用的数据
        this.options = options // 在源码中通过 init 方法实现， 当前直接简写
        instance._x = options.taps.map(o => o.fn) // this._x = [f1, f2, f3, ...]
    }
    create (options) { // 创建一段可执行的代码体 并返回
        let fn
        // fn = new Function("name, age", "var _x = this._x, var _fn0 = _x[0]; _fn0(name, age)")
        
        fn = new Function(
            this.args(),
            this.head() + this.content()
        )
        return fn 
    }
}

let factory = new HookCodeFactory()

class SyncHook extends Hook { 
    constructor(args) { 
        super(args)
    }

    compile (options) { // options的值 { taps: [{}, {}], args: [name, age]}
        factory.setup(this, options)
        return factory.create(options)
    }
}

module.exports = SyncHook