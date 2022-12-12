

function Memoize(func: Function, hasher?: Function) {

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

let add = function (a: number, b: number) {
  return a + b
}


//如果要支持多参数，我们就需要传入 hasher 函数，自定义存储的 key 值
let memoizedAdd = Memoize(add, function () {
  const args = Array.prototype.slice.call(arguments)
  return JSON.stringify(args)
})



console.time('memoizedAdd1')
console.log(memoizedAdd(103333000, 22220000))
console.timeEnd('memoizedAdd1')
console.time('memoizedAdd2')
console.log(memoizedAdd(103333000, 22220000))
console.timeEnd('memoizedAdd2')
