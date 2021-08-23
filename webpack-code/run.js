let webpack = require('./lgPack/lib/webpack')
let options = require('./webpack.config')

let complier = webpack(options)

complier.run(function (err, stats) {
    console.log(err)
    console.log(stats.toJson({
        entries: true,
        chunks: false,
        modules: false,
        assets: false,
    }))
})
