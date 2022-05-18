const wMap = new WeakMap()

function link() {
  let obj = { x: '123' }
  wMap.set(obj, 100)
  console.log('函数内部', wMap.get(obj))
}

link()
console.log(wMap)
