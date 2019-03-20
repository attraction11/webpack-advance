/**
 * webpack 打包 typescript
 * 需要安装带有类型文件的声明
 */
module.exports = {
    entry: {
        'app': './src/app.ts'
    },

    output: {
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
    }
}