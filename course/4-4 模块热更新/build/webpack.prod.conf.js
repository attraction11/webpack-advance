var webpack = require('webpack')
var PurifyWebpack = require('purifycss-webpack')
var HtmlInlinkChunkPlugin = require('html-webpack-inline-chunk-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

var path = require('path')
var glob = require('glob-all')

module.exports = {
    plugins: [
        new PurifyWebpack({
            paths: glob.sync([
                './*.html',
                './src/*.js'
            ])
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),

        new HtmlInlinkChunkPlugin({
            inlineChunks: ['manifest']
        }),

        new webpack.optimize.UglifyJsPlugin(),

        new CleanWebpackPlugin(path.resolve(__dirname, '../dist')),
    ]
}