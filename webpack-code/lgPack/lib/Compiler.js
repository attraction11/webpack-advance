const {
    Tapable,
    AsyncSeriesHook,
    SyncBailHook,
    AsyncParallelHook,
    SyncHook,
} = require('tapable')

const NormalModuleFactory = require('./NormalModuleFactory')
const Compilation = require('./Compilation')
const Stats = require('./Stats')

// compiler 继承 tapable，因此它具备钩子的操作能力（监听事件、触发事件、webpack是一个事件流）
class Compiler extends Tapable {
    constructor(context) {
        super()
        this.context = context
        this.hooks = {
            done: new AsyncSeriesHook(["stats"]),
            entryOption: new SyncBailHook(["context", "entry"]),

            beforeRun: new AsyncSeriesHook(["compiler"]),
            run: new AsyncSeriesHook(["compiler"]),
            
            thisCompilation: new SyncHook(["compilation", "params"]),
			compilation: new SyncHook(["compilation", "params"]),

            beforeCompile: new AsyncSeriesHook(["params"]),
            compile: new SyncHook(["params"]),
            make: new AsyncParallelHook(["compilation"]),
            afterCompile: new AsyncSeriesHook(["compilation"])
        }
    }
    // run 方法里就是一堆钩子按照顺序触发（beforeRun  run  compile）
    run (callback) {
        console.log('run 方法执行力...')
        const finalCallback = function (err, stats) { 
            callback(err, stats)
        }

        const onCompiled = function (err, compilation) { 
            console.log('onCompiled~~~~~~~~~')
            finalCallback(err, new Stats(compilation))
        }

        this.hooks.beforeRun.callAsync(this, (err) => { 
            this.hooks.run.callAsync(this, (err) => { 
                this.compile(onCompiled)
            })
        })
    }
    // compile 方法：准备参数（newCompilationParams）、触发beforeCompile、将准备参数传给函数并创建 compilation
    compile(callback) { 
        const params = this.newCompilationParams()
        this.hooks.beforeRun.callAsync(params, (err) => { 
            this.hooks.compile.call(params)
            // 内部调用 createCompilation，触发了this.compilation 钩子和 compilation 钩子的监听
            const compilation = this.newCompilation(params)
            // 创建 compilation 对象后，就触发了 make 钩子
            this.hooks.make.callAsync(compilation, (err) => { 
                console.log('make钩子监听触发了')
                callback(err, compilation)
            })
        })
    }

    newCompilationParams () { 
        const params = {
            normalModuleFactory: new NormalModuleFactory()
        }
        return params
    }

    newCompilation (params) { 
        const compilation = this.createCompilation()
        this.hooks.thisCompilation.call(compilation, params)
        this.hooks.compilation.call(compilation, params)
        return compilation
    }

    createCompilation () { 
        return new Compilation(this)
    }
}

module.exports = Compiler