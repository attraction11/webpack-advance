const ua = navigator.userAgent
function getCefVersion() {
    let ret = ua.match(/cef@(\d+.\d+)/)
    if (ret) {
        return parseFloat(ret[1])
    }
}
function isMobile() {
    return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
}
export default {
    ua,
    isPC: /CloseliVms/i.test(ua) && !isMobile(),
    cef: getCefVersion(),
    isMobile: isMobile()
}
