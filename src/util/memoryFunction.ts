// 第二版 (来自 underscore 的实现)
var memoize = function (func:Function, hasher:any):any {
  var memoize:any = function (key) {
    var cache = memoize.cache
    var address = '' + (hasher ? hasher.apply(this, arguments) : key)
    if (!cache[address]) {
      cache[address] = func.apply(this, arguments)
    }
    return cache[address]
  }
  memoize.cache = {}
  return memoize
}
