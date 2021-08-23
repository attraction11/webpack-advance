class Hook {
    constructor(args = []) {
        this.args = args
        this.taps = [] // 将来用于存放组织好的 {}
        this._x = undefined // 将来在代码工厂函数中会给 _x = [f1, f2, f3, .......]
    }

    tap (options, fn) {
        if (typeof options === 'string') {
            options = { name: options }
        }
        options = Object.assign({ fn }, options) // {fn: ..., name: 'fn1'}
        // 调用以下方法，将组装好的 options 添加至 []
        this._insert(options)
    }

    tapAsync (options, fn) {
        if (typeof options === 'string') {
            options = { name: options }
        }
        options = Object.assign({ fn }, options) // {fn: ..., name: 'fn1'}
        // 调用以下方法，将组装好的 options 添加至 []
        this._insert(options)
    }

    _insert (options) { 
        this.taps[this.taps.length] = options
    }

    call (...args) { 
        //  1、创建将来要具体执行的函数代码结构
        let callFn = this._createCall()
        // 2、调用上述的函数, 传入args
        return callFn.apply(this, args)
    }

    callAsync (...args) { 
        let callFn = this._createCall()
        return callFn.apply(this, args)
    }

    _createCall () { 
        return this.compile({
            taps: this.taps,
            args: this.args
        })
    }
}

module.exports = Hook