module.exports = {
    // 只有html时才会，执行匹配跳转
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    rewrites: [
        {
            from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
            to: function (context) {
                return '/' + context.match[1] + context.match[2] + '.html'
            }
        }
    ]
}
