# webpack4-demo
四大维度解读webpack4+的配置
#1、什么是webpack?它和grunt,gulp有什么不同？
webpack是一个模块打包器，它可以递归的打包项目中的所有的模块，最终生成几个打包后的文件。它和其他工具
最大的不同是它支持（code-splitting ）代码分割、模块化（AMD、ESM、CommonJs）,全局分析
#2、什么是bundle、chunk、module？
bundle是webpack打包出来的文件，chunk是webpack在进行模块的依赖分析的时候，代码分割出来的代码块。
module是开发中的单个模块。
#3、什么是loader?什么是Plugin?
loader是用来告诉webpack如何转化处理某一种类型的文件，并且引入到打包出的文件中。
Plugin是用来自定义webpack打包过程的方式，一个插件是含有apply方法的一个对象，通过这个方法可以参与
到整个webpack打包的各个流程（生命周期）
#4、webpack-dev-server和http服务器如nginx有什么不同？
webpack-dev-server使用内存来储存webpack开发环境下的打包文件，并且可以使用模块进行热更新。
它比传统的http服务开发更加简单高效。
#5、什么是模块热更新？
模块热更新是webpack的一个功能，它可以使代码修改后不用刷新浏览器就可以更新。
它的实现原理是websocket推送变更消息，监听到变化，代码重新执行一遍，修改数据。
#6、webpack的工作原理？
webpack 的工作原理，如果不涉及到其他的插件其实从webpack 打包出来的源码中就能看出，
或者是他产出的profile，webpack 会把打包后的文件都编号，然后再通过内置的方法require，
表面上是这样，其实其内部还涉及到了一系列的依赖分析，
其中涉及到抽象语法树(Abstract Syntax Tree) 等等一系列的行为。
#7、什么是长缓存？在webpack中如何做到长缓存？
浏览器在用户访问页面的时候，为了加快加载速度，会对用户访问的静态资源进行储存，但是每一次代码升级
或更新都需要浏览器去下载新代码。最方便和简单的方式就是引入新的文件名称。在webpack中可以在output给
输出的文件chunkhash,并且分离经常更新的代码和框架的代码。通过NamedModulesPlugin或是
HashedModuleIdsPlugin使再次打包的文件名不变。
#8、什么是Tree-shaking? CSS可以Tree-shaking?
Tree-shaking是指在打包中去除那些引入了，但是在代码中没有被用到的那些死代码。在webpack中
Tree-shaking是通过uglifgJSPlugin来Tree-shaking JS. CSS需要使用Plfify-CSS.
#9、Webpack工程化思想
一切皆模块、急速的调试响应速度、优化应该自动完成。
#10、Webpack工程化思想
零配置、更快、更小、优化应该自动完成。

