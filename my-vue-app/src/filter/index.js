import moment from 'moment-timezone'
import { language } from '@/utils/locale'
import { byteLength } from '@/utils'

if (language === 'zh') {
    moment.locale('zh_CN')
} else {
    moment.locale(language)
}

export default {
    // formatTagName(value) {
    //     return value.replace(/-/g, '_')
    // },
    formatDatetime(value, formatStr, timezone = moment.tz.guess()) {
        // 格式化到日期
        if (!value) {
            return value
        }

        return moment(value)
            .tz(timezone)
            .format(formatStr || 'YYYYMMDD')
    },
}
