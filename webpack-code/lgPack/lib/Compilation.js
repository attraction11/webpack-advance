const path = require('path')
const Parser = require('./Parser')
const { Tapable, SyncHook } = require('tapable')
const NormalModuleFactory = require('./NormalModuleFactory')

const normalModuleFactory = new NormalModuleFactory()
const parser = new Parser()

class Compilation extends Tapable{ 
    constructor(compiler) { 
        super()
        this.compiler = compiler
        this.context = compiler.context
        this.options = compiler.options
        // 让 compilation 具备文件读写的能力
        this.inputFileSystem = compiler.inputFileSystem
        this.outputFileSystem = compiler.outputFileSystem
        this.entries = [] // 存入所有入口模块的数组
        this.modules = [] // 存放所有模块的数据
        this.hooks = {
            succeedModule: new SyncHook(['module'])
        }
    }

    // 完成模块编译操作 context（项目根）, entry（入口文件）, name（例如: main）,
    addEntry (context, entry, name, callback) { 
        this._addModuleChain(context, entry, name, (err, module) => { 
            callback(err, module)
        })
    }

    _addModuleChain (context, entry, name, callback) { 
        let entryModule = normalModuleFactory.create({
            name,
            context,
            rawRequest: entry,
            // 当前操作的核心作用就是返回 entry 入口的绝对路径
            resource: path.posix.join(context, entry),
            parser
        })

        const afterBuild = function (err) { 
            callback(err, entryModule)
        }


        this.buildModule(entryModule, afterBuild)

        // 当我们完成了本次的 build 操作之后将 module 进行保存
        this.entries.push(entryModule)
        this.modules.push(entryModule)
    }

    // 加载模块并获取AST语法树
    buildModule (module, callback) { 
        module.build(this, (err) => { 
            // 若代码走到这里，则表示当前 module 的编译完成了
            this.hooks.succeedModule.call(module)
            callback(err)
        })
    }
}

module.exports = Compilation