import { Message } from 'element-ui'
import userAgent from './userAgent'

let vmsMessage = (message = '', options = {}) => {
    let defaultOptions = {
        message: message,
        duration: 0,
        center: true,
        customClass: 'vms-message',
        iconClass: 'vms-message-icon'
    }

    if (userAgent.isPC && !options.webTip) {
        const type = options.type === 'warning' ? 'warn' : options.type
        message = message === null ? '' : message
        if (message) {
            QtBridge.ShowTip({
                message,
                type: type || 'warn'
            })
        }
        return {}
    }

    if (options) {
        if (options.type === 'success') {
            defaultOptions.duration = 1500
        } else if (options.type === 'warning') {
            defaultOptions.duration = 2000
        } else if (options.type === 'error') {
            defaultOptions.duration = 2000
        }
        defaultOptions = Object.assign(defaultOptions, options)
    }
    return Message(defaultOptions)
}

export default vmsMessage
