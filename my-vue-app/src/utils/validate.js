/**
 * Created by jiachenpan on 16/11/18.
 */

// a-zA-Z0-9 以外的字符
export const REGEX_SPECIAL = /[^a-zA-Z0-9]+/g
// 姓名规则：中文、字母、空格
export const REGEX_NAME = /[^\u4e00-\u9fa5a-zA-Z ]+/g
// 文件名：中文、字母、空格、数字
export const REGEX_FILE_NAME = /[^\u4e00-\u9fa5a-zA-Z0-9 ]+/g

export function isvalidUsername(str) {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(str.trim()) >= 0
}

export function validateUsername(str) {
    return str && (validateEmail(str) || validatePhone(str));
}

export function validatePhone(value) {
    return value && value.trim().length === 11 && /^[1-9][2-9]\d{9}$/.test(value.trim());
}

export function validateEmail(value) {
    return value && /^[A-Za-z0-9_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value.trim());
}

export function validateCaptcha(value) {
    return value && /^[A-Za-z0-9]{4}$/.test(value.trim());
}

export function validateSMSCode(value) {
    return value && /^\d{6}$/.test(value.trim());
}

/* 合法uri*/
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}

/* 不得包含空格等不可见字符 */
export function validatePasswordRule1(str) {
    const reg = /\s+/;
    return !reg.test(str)
}

/* 不得包含各种特殊字符(特殊符号、emoji、中文) */
export function validatePasswordRule2(str) {
    const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im,
        regEmoji = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/im,
        regZh = /[\u4e00-\u9fa5]/im;
    return !(regCn.test(str) || regEmoji.test(str) || regZh.test(str))
}

/* 必须包含一个大写一个小写一个数字的密码组合 */
export function validatePasswordRule3(str) {
    const reg = /^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*).{3,}$/;
    return reg.test(str)
}

/* 密码长度6-26位 */
export function validatePasswordRule4(str) {
    const reg = /^\S{6,26}$/
    return reg.test(str)
}

export function replaceSpace(str) {
    return str.replace(/\s+/g, '')
}

export function replaceSpecialChar(str) {
    return str.replace(REGEX_SPECIAL, '')
}

// 中文，英文字母和数字
export function replaceMapSearchChar(str) {
    return str.replace(/[^\u4e00-\u9fa5\sa-zA-Z0-9]+/, '')
}


export function replaceEmoji(str){
    const reg = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}\u{200d}]*/ug
    return str.replace(reg,'')
}

// 姓名规则：中文、字母、空格
export function formatName(str) {
    return str.replace(REGEX_NAME, '')
}

// 过滤 @ 和 ?
export function replaceAtAndQuestionMark(str) {
    return str.replace(/[@\?]*/g, '')
}

export function IS_CORRECT_FILE_NAME(str) {
    const nStr = str.replace(REGEX_FILE_NAME, '')
    return  nStr === str
}

export function formatItemName(str) {
    return str.replace(/[^\u4e00-\u9fa5\sa-zA-Z0-9]+/, '')
}

// 计划名称 仅可输入 中英文 数字 空格
export function formatPlanName(str) {
    return str.replace(/[^\u4e00-\u9fa5\sa-zA-Z0-9]+/, '')
}


