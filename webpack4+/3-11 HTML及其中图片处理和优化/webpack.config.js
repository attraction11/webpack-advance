var webpack = require('webpack')
var PurifyWebpack = require('purifycss-webpack')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlInlinkChunkPlugin = require('html-webpack-inline-chunk-plugin')

var path = require('path')
var glob = require('glob-all')

var extractLess = new ExtractTextWebpackPlugin({
    filename: 'css/[name]-bundle-[hash:5].css',
})

module.exports = {
    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-bundle-[hash:5].js'
    },

    resolve: {
        alias: {
            jquery$: path.resolve(__dirname, 'src/libs/jquery.min.js')
        }
    },

    module: {
        rules: [
            {
                test:/\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                ]
            },

            {
                test: /\.less$/,
                use: extractLess.extract(
                    {
                        fallback: {
                            loader: 'style-loader',
                            options: {
                                singleton: true,
                                // transform: './css.transform.js'
                            }
                        },
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 2
                                    // minimize: true,
                                    // modules: true,
                                    // localIdentName: '[path][name]_[local]_[hash:base64:5]'
                                }
                                // loader: 'file-loader'
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    plugins: [
                                        require('postcss-sprites')({
                                            spritePath: 'dist/assets/imgs/sprites',
                                            retina: true
                                        }),
                                        require('postcss-cssnext')()
                                    ]
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
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         publicPath: '',
                    //         outputPath: 'dist/',
                    //         useRelativePath: true
                    //     }
                    // }
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].[ext]',
                            limit: 1000,
                            outputPath: 'assets/imgs/'
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            pngquant: {
                                quality: 80
                            }
                        }
                    }
                ]
            },

            {
                test:/\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].[ext]',
                            limit: 5000,
                            publicPath: '',
                            outputPath: 'dist/',
                            // 这里配置使hTML中引入的图片不进入dist目录
                            useRelativePath: true
                        }
                    }
                ]
            },

            {
                test: path.resolve(__dirname, 'src/app.js'),
                use: [
                    {
                        loader: 'imports-loader',
                        options: {
                            $: 'jquery'
                        }
                    }
                ]
            },

            // {
            //     test: /\.html$/,
            //     use: [
            //         {
            //             loader: 'html-loader',
            //             options: {
            //                 attrs: ['img:src', 'img:data-src']
            //             }
            //         }
            //     ]
            // }
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

        // 提取公共文件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),

        // 将常用的js代码直接写入html中，避免多次请求公共js
        new HtmlInlinkChunkPlugin({
            inlineChunks: ['manifest']
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            minify: {
                collapseWhitespace: true
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
}
