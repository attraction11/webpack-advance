var webpack = require('webpack')
var PurifyWebpack = require('purifycss-webpack')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

var path = require('path')
var glob = require('glob-all')

var extractLess = new ExtractTextWebpackPlugin({
    filename: 'css/[name].bundle.css',
})

module.exports = {
    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/',
        filename: '[name].bundle.js'
    },

    resolve: {
        alias: {
            // jquery 别名，告诉webpack jquery = src/libs/jquery.min.js
            jquery$: path.resolve(__dirname, 'src/libs/jquery.min.js')
        }
    },

    module: {
        rules: [
            {
                test: /\.less$/,
                use: extractLess.extract(
                    {
                        fallback: {
                            loader: 'style-loader',
                            options: {
                                singleton: true
                            }
                        },
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 2
                                }
                            },

                            {
                                loader: 'less-loader'
                            }
                        ]
                    })
            },

            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash:5].[ext]',
                            limit: 1000,
                            publicPath: '',
                            outputPath: 'dist/',
                            useRelativePath: true
                        }
                    }
                    // {
                    //     loader: 'img-loader',
                    //     options: {
                    //         pngquant: {
                    //             quality: 80
                    //         }
                    //     }
                    // }
                ]
            },

            {
                test:/\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].[ext]',
                            // 转为 baseurl 的前提
                            limit: 5000,
                            publicPath: '',
                            outputPath: 'dist/',
                            useRelativePath: true
                        }
                    }
                ]
            },

            {
                test: path.resolve(__dirname, 'src/app.js'),
                use: [
                    {   
                        // 使用 imports-loader 注入
                        loader: 'imports-loader',
                        options: {
                            $: 'jquery'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        extractLess,
        new PurifyWebpack({
            paths: glob.sync([
                './*.html',
                './src/*.js'
            ])
        }),
        // 或是提供一个变量
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // }),
        new webpack.optimize.UglifyJsPlugin()
    ]
}