// css-loader
module.exports = {
    module: {
        rules: [
            { 
                test: /\.css$/, 
                use: 'css-loader' 
            }
        ]
    }
}

// 简单写法
module.exports = {
    entry: 'index.js'
}

// 数组写法
module.exports = {
    entry: ['index.js', 'vendor.js']
}

// 推荐写法
module.exports = {
    entry: {
        index: ['index.js', 'app.js'],
        vendor: 'vendor.js'
    }
}

// 单个文件 单个输出
module.exports = {
    entry: 'index.js',
    output: {
        filename: 'index.min.js'
    }
}

// 多个文件 多个输出
module.exports = {
    entry: {
        index: 'index.js',
        vendor: 'vendor.js'
    },
    output: {
        filename: '[name].min.[hash:5].js'
    }
}








module.exports = {
    module: {
        rules: [
            { 
                test: /\.css$/, 
                use: 'css-loader' 
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
    ]
}