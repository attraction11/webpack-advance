let webpack = require('./lgPack/lib/webpack')
let options = require('./webpack.config')

let complier = webpack(options)

// 由 compiler 调用run方法
complier.run(function (err, stats) {
    console.log(err)
    console.log(stats)
})
