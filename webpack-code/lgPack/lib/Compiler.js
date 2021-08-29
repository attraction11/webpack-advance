const {
    Tapable,
    AsyncSeriesHook,
    SyncBailHook,
    AsyncParallelHook,
    SyncHook,
} = require('tapable')


const path = require('path')
const mkdirp = require('mkdirp')
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
            afterCompile: new AsyncSeriesHook(["compilation"]),
            emit: new AsyncSeriesHook(["compilation"]),
        }
    }
    emitAssets (compilation, callback) {
        // 当前需要做的核心： 创建dist    在目录创建完成后执行文件的写操作

        // 定义一个工具方法用于文件的生成操作
        const emitFiles = (err) => {
            const assets = compilation.assets
            const outputPath = this.options.output.path

            for (let file in assets) {
                let source = assets[file]
                let targetPath = path.posix.join(outputPath, file)
                this.outputFileSystem.writeFileSync(targetPath, source, 'utf8')
            }

            callback(err)
        }

        // 创建目录之后，启动文件写入
        this.hooks.emit.callAsync(compilation, (err) => {
            mkdirp.sync(this.options.output.path)
            emitFiles()
        })
    }
    // run 方法里就是一堆钩子按照顺序触发（beforeRun  run  compile）
    run (callback) {
        console.log('run 方法执行力...')
        const finalCallback = function (err, stats) {
            callback(err, stats)
        }

        const onCompiled = (err, compilation) => {
            console.log('onCompiled~~~~~~~~~')
            finalCallback(err, new Stats(compilation))

            // 最终在这里将处理好的 chunk 写入到指定的文件然后输出到 dist 
            this.emitAssets(compilation, (err) => {
                let stats = new Stats(compilation)
                finalCallback(err, stats)
            })
        }

        this.hooks.beforeRun.callAsync(this, (err) => {
            this.hooks.run.callAsync(this, (err) => {
                this.compile(onCompiled)
            })
        })
    }
    // compile 方法：准备参数（newCompilationParams）、触发beforeCompile、将准备参数传给函数并创建 compilation
    compile (callback) {
        const params = this.newCompilationParams()
        this.hooks.beforeRun.callAsync(params, (err) => {
            this.hooks.compile.call(params)
            // 内部调用 createCompilation，触发了this.compilation 钩子和 compilation 钩子的监听
            const compilation = this.newCompilation(params)
            // 创建 compilation 对象后，就触发了 make 钩子
            this.hooks.make.callAsync(compilation, (err) => {
                // console.log('make钩子监听触发了')
                // callback(err, compilation)

                // 在这里我们开始处理chunk
                compilation.seal((err) => {
                    this.hooks.afterCompile.callAsync(compilation, (err) => {
                        callback(err, compilation)
                    })
                })
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