'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

// 将路径指定到根目录
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
})

const pages = ['main'];

let entryConfig = {};
pages.forEach((v) => {
    // path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entryConfig[v] = ['babel-polyfill', path.resolve(__dirname, '../src/' + v + '.js')];
});

module.exports = {
    // 指定webpack运行的上下文
    context: path.resolve(__dirname, '../'),
    entry: entryConfig,
    output: {
        path: config.build.assetsRoot,
        // 定义静态加载模块名称
        filename: '[name].js',
        // 定义动态加载模块名称
        chunkFilename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'moment': 'moment/min/moment-with-locales.min.js',
            '@': resolve('src'),
            'components': resolve('src/components'),
            'pages': resolve('src/pages'),
            // 'styles': resolve('src/styles'),
            'api': resolve('src/api'),
            'utils': resolve('src/utils'),
            'store': resolve('src/store'),
            'router': resolve('src/router'),
            '@assets': resolve('src/assets'),
        }
    },
    module: {
        noParse: [/moment-with-locales/],
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            //.css 文件使用 style-loader 和 css-loader 来处理
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader',
                exclude: [resolve('node_modules'), resolve("src/assets")],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: resolve('src/icons'),
                options: {
                    symbolId: 'icon-[name]'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                exclude: resolve("src/icons"),
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}
