import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {getQueryString} from '@/utils'
import messages from '@/i18n'

const DEFAULT_LANGUAGE = 'zh'

function getLanguage() {
    return getQueryString('language') || localStorage.getItem('language') || DEFAULT_LANGUAGE
    // return 'en'
}

Vue.use(VueI18n)
let language = getLanguage();
if(!messages[language]) {
    language = DEFAULT_LANGUAGE
}
localStorage.setItem('language', language)
window.LocaleMessage = messages[language];
const i18n = new VueI18n({
    locale: language,
    messages
})

export {i18n, language}
