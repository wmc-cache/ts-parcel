export function deepClone(obj: any, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  if (map.has(obj)) {
    return map.get(obj)
  }
  let clone: any

  if (obj instanceof Map) {
    clone = new Map()
    obj.forEach((value, key) => {
      const temp: any = {}
      temp[key] = deepClone(key, map)
      temp[value] = deepClone(value, map)
      clone.set(temp[key], temp[value])
    })
    return clone
  }
  if (obj instanceof Set) {
    clone = new Set()
    obj.forEach((value) => {
      clone.add(deepClone(value, map))
    })
    return clone
  }

  clone = Array.isArray(obj) ? [] : {}
  Object.keys(obj).forEach((key) => {
    clone[key] = deepClone(obj[key], map)
  })
  map.set(obj, clone)
  return clone
}

const map = new Map([
  [1, 2],
  [3, 4],
])
const set: any = new Set([1, 2, 3, 4])
const obj = deepClone({ a: 1, b: 2, c: { d: 3, e: 4 } })
console.log(deepClone(obj))
