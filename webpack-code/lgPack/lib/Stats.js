class Stats { 
    constructor(compilatipn) { 
        this.entries = compilatipn.entries
        this.modules = compilatipn.modules       
        this.chunks = compilatipn.chunks       
        this.files = compilatipn.files       
    }

    toJson () { 
        return this
    }
}

module.exports = Stats