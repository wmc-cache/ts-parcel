export let obj: any = {};
(function IIFE(...arg: any[]) {
  let a = 1
  function get() {
    return a
  }
  function set(val: any) {
    a = val
  }
  console.log('外部模块', arg)

  obj._m = {
    get,
    set,
    a,
  }
})({ name: 'lijie' },{city:'beijing'})

obj._m.a = 2
console.log(obj._m.a)
console.log(obj._m.get())