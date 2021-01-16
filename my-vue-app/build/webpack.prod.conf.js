'use strict'
const path = require('path')
const utils = require('./utils')
// const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// const env = process.env.NODE_ENV === 'testing'
//   ? require('../config/test.env')
//   : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    optimization: {
        // 默认为true，效果就是压缩js代码。
        minimizer: [
            new UglifyJsPlugin(),
            // new UglifyJsPlugin({
            //     uglifyOptions: {
            //         keep_classnames: true, // 是否混淆类名称
            //         keep_fnames: true, // 是否混淆函数名称

            //         ecma: 6, // ecma版本
            //         cache: true, // 是否使用缓存
            //         parallel: true // 使用外部引入的新版本的js压缩工具
            //     }
            // })
            // new OptimizeCSSAssetsPlugin()
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: config.build.productionSourceMap
                    ? { safe: true, map: { inline: false } }
                    : { safe: true }
            }),
        ],
        // 默认为false,runtime相关的代码(各个模块之间的引用和加载的逻辑)内嵌入每个entry
        // true：对于每个entry会生成runtime~${entrypoint.name}的文件。
        // 'single': 会生成一个唯一单独的runtime.js文件，就是manifest。
        // multiple：和true一致。
        // name:{}：自定义runtime文件的name
        runtimeChunk: {
            name: 'manifest'
        },
        // 根据不同的策略来分割打包出来的bundle
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    // test: path.resolve(__dirname, "node_modules"),
                    chunks: 'initial',
                    name: 'vendor'
                },
                'async-vendor': {
                    test: /[\\/]node_modules[\\/]/,
                    // test: path.resolve(__dirname, "node_modules"),
                    chunks: 'async',
                    name: 'async-vendor'
                },
                styles: {
                    name: 'styles',
                    test: /\.(scss|css)$/,
                    chunks: 'all',
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        },
        // module id 不再是简单的 id 了，而是一串hash字符串，这样就固定了module id
        moduleIds: 'hashed',
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        // new webpack.DefinePlugin({
        //   'process.env': env
        // }),
        new VueLoaderPlugin(),
        // extract css into its own file
        // new ExtractTextPlugin({
        //     filename: utils.assetsPath('css/[name].[contenthash].css'),
        //     // Setting the following option to `false` will not extract CSS from codesplit chunks.
        //     // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
        //     // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
        //     // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
        //     allChunks: true,
        // }),
        new MiniCssExtractPlugin({
            filename: 'css/app.[name].css',
            chunkFilename: 'css/app.[contenthash:12].css'  // use contenthash *
        }),

        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: process.env.NODE_ENV === 'testing'
                ? 'index.html'
                : config.build.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),

        // enable scope hoisting
        // new webpack.optimize.ModuleConcatenationPlugin(),        

        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
})

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
