const wMap = new WeakMap()

function link() {
  let obj = { x: '123' }
  wMap.set(obj, 100)
  console.log('内', wMap.get(obj))
}

link()
console.log(wMap)
