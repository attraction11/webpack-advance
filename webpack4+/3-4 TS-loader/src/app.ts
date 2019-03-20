import * as _ from 'lodash'

// 在typescript中可以使用js语法
console.log(_.chunk([1, 2, 3, 4], 2))

const NUM = 45

interface Cat {
    name: String,
    gender: String
}

function touchCat (cat: Cat) {
    console.log('miao~ ', cat.name)
}

touchCat({
    name: 'tom',
    gender: 'male'
})

// 在编写typescript代码时可以使用类型工具Typings
// 步骤：npm install typings      typings install lodash
// typings.json文件类似package.json文件
// tsconfig.json为typescript文件的配置文件
