var path = require('path')
var Webpack = require('webpack')
// https://github.com/webpack-contrib/purifycss-webpack
var PurifyCSS = require('purifycss-webpack')
var glob = require('glob-all')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      // 这里可以指定一个 publicPath
                      // 默认使用 webpackOptions.output中的publicPath
                      publicPath: '../'
                    }
                  },
                  'style-loader',
                  'css-loader',
                  'less-loader',
                ]
            },
            {
              test: /\.js$/,
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    presets: ['env'],
                    // 可以配合UglifyJsPlugin， 只打包lodash中用到的方法
                    plugins: ['plugin-lodash']
                  }
                }
              ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].min.css',
            allChunks: false
        }),

        // CSS Tree shaking
        // 注意PurifyCSS需要放在ExtractTextWebpackPlugin之后
        // 注意PurifyCSS不能和CSS module 一起用，可以通过设置白名单解决
        new PurifyCSS({
            // 针对以下的路径进行Tree shaking
            // 注意：需要npm install glob-all --save-dev  支持多个路径
            paths: glob.sync([
                path.join(__dirname, './*.html'),
                path.join(__dirname, './src/*.js')
            ])
        }),

        // JS Tree shaking
        new Webpack.optimize.UglifyJsPlugin()
    ]
}
