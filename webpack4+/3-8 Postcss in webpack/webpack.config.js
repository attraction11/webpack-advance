var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var cssExtract = new ExtractTextWebpackPlugin({
    filename: '[name].min.css',
    // 默认为false,提取初始化阶段的CSS，异步加载CSS打包到另一个文件
    allChunks: false
})

module.exports = {
    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        // 指定初始化打包文件的名称
        filename: '[name].bundle.js',
        // 指定异步加载打包文件的名称
        chunkFilename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.less$/,
                use: cssExtract.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            singleton: true,
                            transform: './css.transform.js'
                        }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                // CSS 代码压缩
                                // minimize: true,
                                // CSS Module
                                modules: true,
                                // CSS module 打包出来的class名规则
                                localIdentName: '[path][name]_[local]_[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                // 指定插件为postcss提供
                                ident: 'postcss',
                                plugins: [
                                    // 自动加浏览器前缀
                                    // require('autoprefixer')(),
                                    // 使用未来的css,postcss-cssnext中已经包含了autoprefixer
                                    require('postcss-cssnext')()
                                    // 优化、压缩代码 同 minimize: true
                                    // require('postcss-cssnano')()
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            }
        ]
    },

    plugins: [
        cssExtract
    ]
}
