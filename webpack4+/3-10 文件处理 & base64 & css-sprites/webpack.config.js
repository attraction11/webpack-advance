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
            // $ 指定一个文件，而不是一个文件目录
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
                              loader: 'postcss-loader',
                              options: {
                                // 指定插件为postcss提供
                                ident: 'postcss',
                                plugins: [
                                  require('postcss-sprites')({
                                    spritePath: 'dist/assets/imgs/sprites',
                                    // 针对MAC视网膜屏两倍大小的图标
                                    retina: true
                                  }),
                                  // 自动加浏览器前缀
                                  // require('autoprefixer')(),
                                  // 使用未来的css,postcss-cssnext中已经包含了autoprefixer
                                  require('postcss-cssnext')(),
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
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         name: '[name]-[hash:5].[ext]',
                    //         limit: 1000,
                    //         publicPath: '',
                    //         outputPath: 'dist/',
                    //         useRelativePath: true
                    //     }
                    // }
                    // 处理图片大小低于限制值，转为base64
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].min.[ext]',
                            limit: 1000,
                            publicPath: '',
                            outputPath: 'dist/',
                            useRelativePath: true
                        }
                    },
                    // 压缩图片,quality调整图片质量
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
