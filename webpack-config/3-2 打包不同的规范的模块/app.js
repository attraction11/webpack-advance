// es module (es6)
import sum from './sum'

// commonjs (node)
var minus = require('./minus')

// amd (requireJs)
require(['./muti'], function(muti) {
    console.log('muti(2, 3) =', muti(2, 3))
})

console.log('sum(23, 24) =', sum(23, 24))
console.log('minus(24, 17) =', minus(24, 17))
