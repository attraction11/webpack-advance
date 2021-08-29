(function (modules) {
    // 15、定义 webpackJsonpCallback 实现：合并模块定义、改变 promise 状态执行后续行为
    function webpackJsonpCallback (data) { 
        // 15-1、获取需要被动态加载的模块 id
        let chunkIds = data[0]
        // 15-2、获取需要被动态加载的模块依赖关系对象
        let moreModules = data[1]
        // 15-3、循环判断 chunkIds 里所对应模块内容是否完成了加载
        let chunkId, resolves = []
        for (let i = 0; i < chunkIds.length; i++) { 
            chunkId = chunkIds[i]
            if (Object.prototype.hasOwnProperty.call(inStalledChunks, chunkId) && inStalledChunks[chunkId]) { 
                resolves.push(inStalledChunks[chunkId][0])
            }
            // 15-5、更新当前 chunk 状态
            inStalledChunks[chunkId] = 0
        }
        // 15-6、将动态加载的模块挂载到 modules 上
        for (moduleId in moreModules) { 
            if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) { 
                modules[moduleId] = moreModules[moduleId]
            }
        }

        while (resolves.length) { 
            resolves.shift()()
        }
    }

    // 01、定义一个对象用于将来缓存被加载过的模块
    let installedModules = {}

    // 15-4、定义 inStalledChunks 用于标识某个 chunkId 对应的 chunk 是否完成加载 
    //存储已加载和正在加载的块
    // undefined = chunk未加载，null = chunk预加载/预取
    // Promise = chunk 加载中, 0 = chunk 已加载
    let inStalledChunks = {
        main: 0
    }

    // 02、定义一个 __webpack_require__ 方法来替换 import require 加载操作
    function __webpack_require__ (moduleId) {
        // 2-1、判断当前缓存中是否存在要被加载的模块内容，如果存在则直接返回
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports
        }

        // 2-2、若当前缓存中不存在，则需要我们自己定义{} 执行被导入的模块内容加载
        let module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        }

        // 2-3、调用当前 moduleId 对应的函数，然后完成内容的加载
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)

        // 2-4、当上述的方法调用完成后，我们就可以修改 l 的值用于表示当前模块内容已经加载完成
        module.l = true

        // 2.5、加载工作完成后，要将拿回来的内容返回至调用的位置
        return module.exports
    }

    // 03、定义 m 属性用于保存 modules
    __webpack_require__.m = modules;

    // 04、定义 c 属性用于保存 cache
    __webpack_require__.c = installedModules

    // 05、定义 o 方法用于判断对象的身上是否存在指定的属性
    __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty(object, property)
    }

    // 06、定义 d 方法用于在对象的身上添加指定的属性，同时给该属性提供一个 getter
    __webpack_require__.d = function (exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, { enumerable: true, get: getter })
        }
    }

    // 07、定义 r 方法用于标识当前模块是 es6 类型
    __webpack_require__.r = function (exports) {
        if (typeof Symbol !== '' && Symbol.toStringTag) {
            Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" })
        }
        Object.defineProperty(exports, '__esModule', { value: true })
    }

    // 08、定义 n 方法， 用于设置具体的 getter
    __webpack_require__.n = function (module) {
        let getter = module && module.__esModule ?
            function getDefault () {
                return module['default']
            } :
            function getModuleExports () {
                return module
            }

        __webpack_require__.d(getter, 'a', getter)
        return getter
    }

    // 11、定义 t 方法， 用于加载指定 value 的模块内容， 之后对内容进行处理再返回
    __webpack_require__.t = function (value, mode) {
        // 01、加载 value 对应的模块内容（value 一般就是模块id）
        if (mode & 1) {
            // 加载的内容重新赋值给 value 变量
            value = __webpack_require__(value)
        }
        if (mode & 8) { // 加载了 CommonJS 规范的代码，可以直接返回使用内容 
            return value
        }
        if ((mode & 4) && typeof value === 'object' && value && value.__esModule) { // 加载了 EsModule 规范的代码，可以直接返回使用内容 
            return value
        }

        // 若 8 和 4 都没有成立，则需要自定义 ns 来通过 default 属性返回内容（例如：value为字符串）
        let ns = Object.create(null)
        // 用于标识当前模块是 es6 类型
        __webpack_require__.r(ns)
        Object.defineProperty(ns, 'default', { enumerable: true, value: value })

        if (mode & 2 && typeof value !== 'string') { // 若value为对象
            for (var key in value) {
                __webpack_require__.d(ns, key, function (key) {
                    return value[key]
                }.bind(null, key))
            }
        }
        return ns
    }

    // 17、定义 jsonpScriptSrc 实现 src 的处理
    function jsonpScriptSrc (chunkId) { 
        return __webpack_require__.p + '' + chunkId + '.built.js'
    }

    // 16、定义 e 方法用于实现：实现 jsonp 来加载内容、利用 promise 来实现异步加载操作
    __webpack_require__.e = function (chunkId) { 
        // 16-1、定义一个数组用于存放 promise 
        let promises = []

        // 16-2、获取 chunkId 获取 chunk 是否已经完成加载
        let inStalledChunkData = inStalledChunks[chunkId]

        // 16-3、依据当前是否已完成加载状态，来决定后续的执行逻辑
        if (inStalledChunkData !== 0) { 
            if (inStalledChunkData) {
                promises.push(inStalledChunkData[2])
            } else { 
                let promise = new Promise((resolve, reject) => { 
                    inStalledChunkData = inStalledChunks[chunkId] = [resolve, reject]
                })
                promises.push(inStalledChunkData[2] = promise)

                // 16-3-1、创建标签以及定义属性
                let script = document.createElement('script')
                script.src = jsonpScriptSrc(chunkId)
                document.head.appendChild(script)
            }
        }

        // 16-4、执行promise
        return Promise.all(promises)
    }

    // 12、定义变量存放数组
    let jsonpArray = window['webpackJsonp'] = window['webpackJsonp'] || []

    // 13、保存原生的 push 方法
    let oldJsonpFunction = jsonpArray.push.bind(jsonpArray)

    // 14、重写原生的 push 方法
    jsonpArray.push = webpackJsonpCallback

    // 9、定义 p 属性，用于保存资源访问路径
    __webpack_require__.p = ''

    // 10、调用 __webpack_require__ 方法执行模块导入与加载操作
    return __webpack_require__(__webpack_require__.s = './src/index.js')

})({
    "./src/index.js":
        (function (module, exports, __webpack_require__) {
            let oBtn = document.getElementById('btn')
            oBtn.addEventListener('click', function () {
                __webpack_require__.e(/*! import() | login */ "login").then(__webpack_require__.t.bind(null, /*! ./login.js */ "./src/login.js", 7)).then(login => {
                    console.log(login)
                })
            })

            console.log('index.js内容执行了')
        })
})