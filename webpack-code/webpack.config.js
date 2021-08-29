const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'none',
    mode: 'development',
    context: process.cwd(),
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve('dist')
    },
    //   plugins: [
    //     new HtmlWebpackPlugin({
    //       template: './src/index.html'
    //     })
    //   ]
}