let webpack = require('webpack')
let HTMLWebpackPlugin = require('html-webpack-plugin')
let path = require('path')

module.exports = {
    mode: 'development',

    entry: {
      'app': './src/app.ts'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[chunkhash].min.js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                exclude: [
                    path.resolve(__dirname, "app/demo-files")
                ],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            // community formatter
                            formatter: require("eslint-friendly-formatter"),
                        }
                    }
                ]
            },
            {
              test: /\.tsx?$/,
              use: {
                loader: 'ts-loader'
              }
            }
        ]
    },

    devServer: {
        open: true,
        port: 9090,
        overlay: true
    },

    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: path.resolve(__dirname, 'index.html')
        })
    ]
}
