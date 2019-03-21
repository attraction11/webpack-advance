const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        main: './src/foo',
        vendor: ['react']
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },

    plugins: [
        // 解决场景：引入新模块，模块顺序变化，vendor hash变化
        // 原理: 给chunk设置name不因顺序而改变hash
        new webpack.NamedChunksPlugin(),
        new webpack.NamedModulesPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        })
    ]
}
