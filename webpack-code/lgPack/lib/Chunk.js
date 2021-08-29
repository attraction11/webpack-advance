class Chunk { 
    constructor(entryModule) {
        this.entryModule = entryModule
        this.name = entryModule.name
        this.files = [] // chunk 的文件名称
        this.modules = [] // 记录每个 chunk 里所包含的 module
    }
}

module.exports = Chunk