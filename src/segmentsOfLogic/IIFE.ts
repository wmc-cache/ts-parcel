export let obj: any = {};
(function IIFE() {
  let a = 1
  function get() {
    return a
  }
  function set(val: any) {
    a = val
  }

  obj._m = {
    get,
    set,
    a,
  }
})()

obj._m.a = 2
console.log(obj._m.a)
console.log(obj._m.get())
