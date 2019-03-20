let HTMLWebpackPlugin = require('html-webpack-plugin')
let path = require('path')
const UglifyJs = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: 'production',

    entry: {
        'app': './src/index'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: path.resolve(__dirname, 'index.html')
        })
    ],

    optimization: {
        // 默认为true，效果就是压缩js代码。
        minimizer: [
            // new UglifyJs({
            //     uglifyOptions: {
            //         keep_classnames: true, // 是否混淆类名称
            //         keep_fnames: true, // 是否混淆函数名称

            //         ecma: 6, // ecma版本
            //         cache: true, // 是否使用缓存
            //         parallel: true // 使用外部引入的新版本的js压缩工具
            //     }
            // })
        ],

        // 默认为false,runtime相关的代码(各个模块之间的引用和加载的逻辑)内嵌入每个entry
        // true：对于每个entry会生成runtime~${entrypoint.name}的文件。
        // 'single': 会生成一个唯一单独的runtime.js文件，就是manifest。
        // multiple：和true一致。
        // name:{}：自定义runtime文件的name
        runtimeChunk: true,

        // 主要就是根据不同的策略来分割打包出来的bundle
        splitChunks: {
            // 分割出代码是否有名称
            name: true,
            minSize: 0,
            // 缓存策略，默认设置了分割node_modules和公用模块。内部的参数可以和覆盖外部的参数。
            // test 正则匹配文件
            // priority 优先级
            // reuseExistingChunk是否复用存在的chunk
            cacheGroups: {
                preact: {
                    // 多个第三方包的匹配
                    test: /(preact)|lodash/,
                    chunks: 'initial'
                },
                lodash: {
                    test: /lodash/,
                    // 动态加载配置为all
                    chunks: 'all'
                }
            }
        }
    }
}
