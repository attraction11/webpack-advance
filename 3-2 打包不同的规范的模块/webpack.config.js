// 在webpack.config.js中要使用commonjs(node)规范
// webpack 中打包不同的规范的模块
module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        filename: '[name].[hash:5].js'
    }
}
