/**
 * webpack 中处理ES6 or ES7
 * 别忘记项目下的 babelrc
 */

module.exports = {
    entry: {
        app: './app.js'
    },

    output: {
        filename: '[name].[hash:8].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }

}
