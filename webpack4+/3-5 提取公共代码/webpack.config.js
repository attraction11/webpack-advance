var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: {
        'pageA': './src/pageA',
        'pageB': './src/pageB'
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },

    // 在webpack中提取公共代码的配置(多个entry的情况)
    optimization: {
        // webpack 4,是使用splitChunk
        splitChunks: {
            // initial 表示首次加载的jsasync 表示异步加载的jsall 表示所有
            chunks: 'async'
        },
        // 默认为false,runtime相关的代码(各个模块之间的引用和加载的逻辑)内嵌入每个entry
        // true：对于每个entry会生成runtime~${entrypoint.name}的文件。
        // 'single': 会生成一个唯一单独的runtime.js文件，就是manifest。
        // multiple：和true一致。
        // name:{}：自定义runtime文件的name
        runtimeChunk: false
    }
}
