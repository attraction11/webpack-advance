import 'preact'
import 'lodash'

class Hello {
  constructor (x, y) {
    console.log('HELLO WORLD!')
  }
}

let hello = new Hello()
console.log(hello)

// 采用这样的写法，并在.baberc中配置"modules": false
// 有利于将没有用到的代码不进行打包(Tree Shaking)
import { add } from './modules/moduleA'
add(1, 2)

import(/* webpackChunkName: "moduleA" */'./modules/moduleB.js')
import(/* webpackChunkName: "moduleA" */'./modules/moduleC.js')
import(/* webpackChunkName: "moduleA" */'./modules/moduleD.js')
