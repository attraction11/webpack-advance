import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const req = require.context("./modules", true, /index.js$/);
const requireAll = (requireContext) =>
    requireContext.keys().map((key) => {
        return requireContext(key).default;
    });
const mouduleRouters = requireAll(req);

export const constantRouterMap = [
    ...mouduleRouters,
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */'@/pages/Home')
    },

    {
        path: '/todos',
        name: 'todos',
        component: () => import(/* webpackChunkName: 'todo' */'@/pages/Todos')
    }
]

export default new Router({
    base: '/',
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap,
})