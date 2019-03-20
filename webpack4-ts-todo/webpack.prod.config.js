let HTMLWebpackPlugin = require('html-webpack-plugin')
let path = require('path')
const UglifyJs = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: 'production',

    entry: {
      'app': './src/app.ts'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
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
        minimizer: [
            // new UglifyJs({
            //     uglifyOptions: {
            //         keep_classnames: true,
            //         keep_fnames: true,

            //         ecma: 6,
            //         cache: true,
            //         parallel: true
            //     }
            // })
        ],

        runtimeChunk: true,

        splitChunks: {
            name: true,
            minSize: 0,
            cacheGroups: {
                preact: {
                    test: /preact/,
                    chunks: 'initial'
                },
                lodash: {
                    test: /lodash/,
                    chunks: 'all'
                }
            }
        }
    }
}
