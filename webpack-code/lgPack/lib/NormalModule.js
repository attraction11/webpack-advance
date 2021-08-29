class NormalModule { 
    constructor(data) { 
		this.name = data.name
        this.context = data.context
		this.rawRequest = data.rawRequest
		this.parser = data.parser
		this.resource = data.resource
		this._source // 存放某个模块的源代码
		this._ast // 某个模块的源代码的 AST


    }
    build (compilation, callback) { 
        // 从文件中读取到将来被加载的 module 的内容
        // 若当前不是 js 模块 则需要 使用 loader 进行处理， 最终返回  js 模块
        // 上述的代码完成后 就可以将 js 代码转为 AST 语法树
        // 当前js模块内部  可能有引用了其他的模块 因此需要进行递归操作
        // 上面的操作完成后与，只需要重复执行就可
        this.doBuild(compilation, (err) => { 
            this._ast = this.parser.parser(this._source)
            callback(err)
        })
    }

    doBuild (compilation, callback) {
        this.getSource(compilation, (err, source) => { 
            this._source = source
            callback()
        })
    }

    getSource (compilation, callback) {
        compilation.inputFileSystem.readFile(this.resource, 'utf8', callback)
    }
}

module.exports = NormalModule