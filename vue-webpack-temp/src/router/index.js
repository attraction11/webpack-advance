import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 路由懒加载 方法一
// const Rank = (resolve) => {
//   import('@components/rank/rank').then((module) => {
//     resolve(module)
//   })
// }

// const Recommend = (resolve) => {
//   import('@components/recommend/recommend').then((module) => {
//     resolve(module)
//   })
// }

// const Search = (resolve) => {
//   import('@components/search/search').then((module) => {
//     resolve(module)
//   })
// }

// const Singer = (resolve) => {
//   import('@components/singer/singer').then((module) => {
//     resolve(module)
//   })
// }

// const SingerDetail = (resolve) => {
//   import('@components/singer-detail/singer-detail').then((module) => {
//     resolve(module)
//   })
// }

// const TopList = (resolve) => {
//   import('@components/top-list/top-list').then((module) => {
//     resolve(module)
//   })
// }

// const Disc = (resolve) => {
//   import('@components/disc/disc').then((module) => {
//     resolve(module)
//   })
// }

// const UserCenter = (resolve) => {
//   import('@components/user-center/user-center').then((module) => {
//     resolve(module)
//   })
// }

// 路由懒加载 方法二
// const Recommend = () => import('@components/recommend/recommend')
// const Singer = () => import('@components/singer/singer')
// const Rank = () => import('@components/rank/rank')
// const Search = () => import('@components/search/search')
// const SingerDetail = () => import('@components/singer-detail/singer-detail')
// const Disc = () => import('@components/disc/disc')
// const TopList = () => import('@components/top-list/top-list')
// const UserCenter = () => import('@components/user-center/user-center')

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect: '/recommend'
    // },
    // {
    //   path: '/rank',
    //   component: Rank,
    //   children: [
    //     {
    //       path: ':id',
    //       component: TopList
    //     }
    //   ]
    // },
    // {
    //   path: '/recommend',
    //   component: Recommend,
    //   children: [
    //     {
    //       path: ':id',
    //       component: Disc
    //     }
    //   ]
    // },
    // {
    //   path: '/search',
    //   component: Search,
    //   children: [
    //     {
    //       path: ':id',
    //       component: SingerDetail
    //     }
    //   ]
    // },
    // {
    //   path: '/singer',
    //   component: Singer,
    //   children: [
    //     {
    //       path: ':id',
    //       component: SingerDetail
    //     }
    //   ]
    // },
    // {
    //   path: '/user',
    //   component: UserCenter
    // }
  ]
})

// 获取用户信息
// router.beforeEach((to, from, next) => {
//   if (process.env.NODE_ENV === 'production') {
//     if (!to.meta.isAuthcode) {
//       next();
//     } else {
//       window.yl.call('getAuthcode', {}, {
//         onSuccess: (res) => {
//           console.log(res)
//           sessionStorage.setItem('discoveryPage', res.param.authCode);
//           next();
//         },
//         onFail: (res) => {
//           console.log(res)
//           next({
//             path: '/error',
//             query: { msg: '认证权限失败' }
//           })
//         }
//       })
//     }
//   } else {
//     console.log('生产环境失败。。。。')
//     sessionStorage.setItem('discoveryPage', '12398924-cacf-43dc-ba09-b6074c8519b6')
//     next();
//   }
// })


// 路由拦截(登陆及鉴权)
// 不是所有版块都需要鉴权的,所以需要鉴权,我都会在路由meta添加添加一个字段requireLogin,设置为true的时候
// 这货就必须走鉴权,像登录页这些不要,是可以直接访问的!!!
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(res => res.meta.requireLogin)) {
//     // 判断是否需要登录权限
//     if (window.localStorage.getItem('loginUserBaseInfo')) {
//       // 判断是否登录
//       let lifeTime =
//         JSON.parse(window.localStorage.getItem('loginUserBaseInfo')).lifeTime *
//         1000;
//       let nowTime = (new Date()).getTime(); // 当前时间的时间戳
//       if (nowTime < lifeTime) {
//         next();
//       } else {
//         console.log('登录状态信息过期,请重新登录')
//         next({
//           path: '/login'
//         });
//       }
//     } else {
//       // 没登录则跳转到登录界面
//       next({
//         path: '/login'
//       });
//     }
//   } else {
//     next();
//   }
// });

export default router;
