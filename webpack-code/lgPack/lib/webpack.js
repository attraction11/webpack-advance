const Compiler = require('./Compiler')

const webpack = function (options) {
    // 1、实例化 compiler 对象
    let compiler = new Compiler(options.context)
    compiler.options = options

    // 2、初始化 NodeEnvironmentPlugin(让compiler具体文件读写能力)
    new NodeEnvironmentPlugin

    // 3、挂载所有 plugins 插件至 compiler 对象身上
    // 4、挂载所有 webpack 内置的插件（如 处理入口文件的插件）
    // 5、返回 compiler 对象即可

}