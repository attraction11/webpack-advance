class SingleEntryPlugin {
    constructor(context, entry, name) {
        this.context = context;
        this.entry = entry;
        this.name = name;
    }

    apply (compiler) {
        // 监听 make 钩子 （SingleEntryPlugin）
        compiler.hooks.make.tapAsync('SingleEntryPlugin', (compilation, callback) => {
            const { entry, name, context } = this;
            console.log('make 钩子监听执行了~~~~~~~~~')
            // addEntry方法就带着 context, entry, name 去编译了
            compilation.addEntry(context, entry, name, callback)
        })
    }
}

module.exports = SingleEntryPlugin