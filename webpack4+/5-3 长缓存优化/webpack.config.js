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