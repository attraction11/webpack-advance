const Compiler = require('./Compiler')
const NodeEnvironmentPlugin = require('./node/NodeEnvironmentPlugin')
const WebpackOptionsApply = require('./WebpackOptionsApply')

const webpack = function (options) {
    // 1、实例化 compiler 对象(它会贯穿整个webpack工作的过程)
    let compiler = new Compiler(options.context)
    compiler.options = options

    // 2、初始化 NodeEnvironmentPlugin(让compiler具体文件读写能力)
    new NodeEnvironmentPlugin().apply(compiler)

    // 3、挂载所有 plugins 插件至 compiler 对象身上
    if (options.plugins && Array.isArray(options.plugins)) { 
        for (const plugin of options.plugins) { 
            plugin.apply(compiler)
        }
    }

    // 4、挂载所有 webpack 内置的插件（如 处理入口文件的插件）
    new WebpackOptionsApply().process(options, compiler)

    // 5、返回 compiler 对象即可
    return compiler
}

module.exports = webpack