import Vue from 'vue'
import SvgImage from '@/components/svg-image'// svg component

// register globally
Vue.component('svg-image', SvgImage)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
const iconMap = requireAll(req)
