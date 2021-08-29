const ejs = require('ejs')
const path = require('path')
const Chunk = require('./Chunk')
const Parser = require('./Parser')
const async = require('neo-async')
const { Tapable, SyncHook } = require('tapable')
const NormalModuleFactory = require('./NormalModuleFactory')

const normalModuleFactory = new NormalModuleFactory()
const parser = new Parser()

class Compilation extends Tapable {
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
        this.chunks = [] // 存放当前次打包过程中所产出的 chunk
        this.assets = []
        this.files = []
        this.hooks = {
            succeedModule: new SyncHook(['module']),
            seal: new SyncHook(),
            beforeChunks: new SyncHook(),
            afterChunks: new SyncHook(),
        }
    }

    // 完成模块编译操作 context（项目根）, entry（入口文件）, name（例如: main）,
    addEntry (context, entry, name, callback) {
        this._addModuleChain(context, entry, name, (err, module) => {
            callback(err, module)
        })
    }

    _addModuleChain (context, entry, name, callback) {
        this.createModule({
            parser,
            name,
            context,
            rawRequest: entry,
            resource: path.posix.join(context, entry),
            moduleId: './' +  path.posix.relative(context, path.posix.join(context, entry))
        }, (entryModule) => {
            this.entries.push(entryModule)
        }, callback)
    }

    // 定义一个创建模块的方法，达到复用 data（创建模块需要的属性值）, doAddEntry（是否入口）, callback
    createModule (data, doAddEntry, callback) {
        // 判断当前模块是入口模块还是其他
        let module = normalModuleFactory.create(data)

        const afterBuild = (err, module) => {
            // 在 afterBuild 中就需要判断当前 module 完成后 是否需要处理依赖
            if (module.dependencies.length > 0) {
                // 递归模块加载
                this.processDependencies(module, (err) => {
                    callback(err, module)
                })
            } else {
                callback(err, module)
            }
        }


        this.buildModule(module, afterBuild)

        // 当我们完成了本次的 build 操作之后将 module 进行保存
        doAddEntry && doAddEntry(module)
        this.modules.push(module)
    }

    // 加载模块并获取AST语法树
    buildModule (module, callback) {
        module.build(this, (err) => {
            // 若代码走到这里，则表示当前 module 的编译完成了
            this.hooks.succeedModule.call(module)
            callback(err, module)
        })
    }

    processDependencies (module, callback) {
        // 当前函数的核心功能是 实现一个被依赖模块的递归加载
        // 加载模块的思想：创建一个模块，然后将被加载模块的内容传进来
        // 当前我们不知道 module 需要依赖几个模块， 此时需要让所有依赖的模块都加载之后再执行 callback [neo-async]
        let dependencies = module.dependencies

        async.forEach(dependencies, (dependency, done) => {
            this.createModule({
                parser,
                name: dependency.name,
                context: dependency.context,
                rawRequest: dependency.rawRequest,
                moduleId: dependency.moduleId,
                resource: dependency.resource
            }, null, done)
        }, callback);
    }

    seal (callback) {
        this.hooks.seal.call()
        this.hooks.beforeChunks.call()

        // 当前所有的入口模块都被存放在了  compilation 对象的  entries 数组中
        // 所谓封装 chunk 指的就是依据某个入口， 然后找到它的所有的依赖，将它们的源代码放在一起，之后再做合并
        for (const entryModule of this.entries) {
            // 核心：创建模块 加载已有模块的内容，同时记录模块信息
            const chunk = new Chunk(entryModule)

            // 保存 chunk 信息
            this.chunks.push(chunk)

            // 给 chunk 属性赋值
            chunk.modules = this.modules.filter(module => module.name === chunk.name)
        }

        // chunk 流程梳理之后就进入到 chunk 代码处理阶段（模板文件 + 模块中源代码 ==> chunk.js）
        this.hooks.afterChunks.call(this.chunks)

        // 生成代码内容
        this.createChunkAssets()

        callback()
    }

    createChunkAssets () {
        for (let i = 0; i < this.chunks.length; i++) {
            const chunk = this.chunks[i]
            const fileName = chunk.name + '.js'
            chunk.files.push(fileName)

            // 1、获取模板文件的路径
            let tempPath = path.posix.join(__dirname, 'temp/main.ejs')
            // 2、读取模板文件的内容
            let tempCode = this.inputFileSystem.readFileSync(tempPath, 'utf8')
            // 3、获取渲染hanshu
            let tempRender = ejs.compile(tempCode)
            // 4、按照ejs 语法渲染数据
            let source = tempRender({
                entryModuleId: chunk.entryModule.moduleId,
                modules: chunk.modules
            })

            // 输出文件
            this.emitAssets(fileName, source)
        }
    }

    emitAssets (fileName, source) {
        this.assets[fileName] = source
        this.files.push(fileName)
    }
}

module.exports = Compilation