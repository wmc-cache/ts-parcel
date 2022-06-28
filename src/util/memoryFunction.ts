let memoize = function (func: Function, hasher?: Function): any {
  let memoize: any = function (this: any, key: string) {
    let cache = memoize.cache
    let address = '' + (hasher ? hasher.apply(this, arguments) : key)
    if (!cache[address]) {
      cache[address] = func.apply(this, arguments)
    }
    return cache[address]
  }
  memoize.cache = {}
  return memoize
}

let add = function (a: number, b: number, c: number) {
  return a + b - c
}

//如果要支持多参数，我们就需要传入 hasher 函数，自定义存储的 key 值
let memoizedAdd = memoize(add, function () {
  var args = Array.prototype.slice.call(arguments)
  return JSON.stringify(args)
})
console.time('memoizedAdd1')
console.log(memoizedAdd(103333000, 22220000, 3000))
console.timeEnd('memoizedAdd1')
console.time('memoizedAdd2')
console.log(memoizedAdd(103333000, 22220000, 3000))
console.timeEnd('memoizedAdd2')
