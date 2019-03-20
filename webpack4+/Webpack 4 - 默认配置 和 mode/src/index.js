import('./components/a')
import('./components/b')
import('./components/c')
import('./components/d')
import('./components/e')
import('./components/f')

console.log('hello index')
export default 'i am index'

// webpack4 Mode分类
// mode -- production(生产模式)
// mode --development{开发模式}
// mode --none（自定义模式）
// webpack4 默认零配置：
// 1、新的chunk是被共同依赖的，或是从node_modules中来的
// 2、新的chunk大于30k
// 3、在按需加载的时候，最大的并行下载chunk的数量应该小于5（也就是lazyload时）
// 4、在首屏加载的时候，最大的并行下载chunk的数量应该小于等于3
// webpack4 新特性：
// 1、webpack4 支持零配置
// 2、webpack4 打包速度比之前提升90%
// 3、webpack4 Tree shaking ES6
// 3、webpack4 RunTimeChunk / SplitChunk很好用
// webpack5 可能支持特性：
// 1、CSS、HTML、URL/FILE成为原生模块,不再需要extract-text-webpack-plugin，不再需要CSS FILE URL loader了
// 2、CSS Code Splitting 代码切分插件不再需要
// 3、支持HTML entry
