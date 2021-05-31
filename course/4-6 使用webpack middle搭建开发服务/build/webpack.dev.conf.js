const webpack = require('webpack')
const proxy = require('./proxy')
const historyFallback = require('./historyfallback')

module.exports = {
    devtool: 'cheap-module-source-map',

    devServer: {
        port: 9001,
        overlay: true,
        hot: true,
        hotOnly: true,

        proxy: proxy,
        historyApiFallback: historyFallback
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        new webpack.NamedModulesPlugin(),
    ]
}