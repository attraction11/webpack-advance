class Stats { 
    constructor(compilatipn) { 
        this.entries = compilatipn.entries
        this.modules = compilatipn.modules       
    }

    toJson () { 
        return this
    }
}

module.exports = Stats