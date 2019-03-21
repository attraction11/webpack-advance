module.exports = {
    // 目录
    root: true,
    // 语法标准
    extends: 'standard',
    plugins: [
        'html'
    ],
    // 运行环境
    env: {
        browser: true,
        node: true
    },
    // 全局变量配置
    globals: {
        $: true
    },
    rules: {
        'indent': ['error', 4],
        'eol-last': ['error', 'never']
    }
}
