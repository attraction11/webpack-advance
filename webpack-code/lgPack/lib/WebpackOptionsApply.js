const EntryOptionPlugin = require("./EntryOptionPlugin");

class WebpackOptionsApply { 
    process (options, compiler) { 
        // 将内部默认的插件与 compiler 建立关系，其中 EntryOptionPlugin 处理了入口模块的 id
        new EntryOptionPlugin().apply(compiler)
        compiler.hooks.entryOption.call(options.context, options.entry)
    }
}

module.exports = WebpackOptionsApply