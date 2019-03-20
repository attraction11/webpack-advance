const path = require('path')

// 在webpack4中配置mode之后，依然可以进行配置，覆盖默认值
module.exports = {
    mode: 'production',
    entry: {
        app: './src/app.js',
        index: './src/index.js'
    },
    output: {
        filename: '[name].[chunkhash:5].js',
        path: path.resolve('./dist')
    },
    optimization: {
        minimize: false,
        runtimeChunk: 'single'
    }
}
