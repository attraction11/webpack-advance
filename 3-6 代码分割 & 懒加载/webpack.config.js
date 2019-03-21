var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: {
        'pageA': './src/pageA'
        // 'pageB': './src/pageB',
        // 'vendor': ['lodash']
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        // 打包动态加载文件的地址
        publicPath: './dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },

    optimization: {
      minimize: false,
      runtimeChunk: 'all'
    }
}
