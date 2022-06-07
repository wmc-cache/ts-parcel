export function currie(fn: Function) {
  const fnLength = fn.length
  const args: any[] = []
  return function add(...arg: any[]): any {
    args.push(...arg)
    console.log(args)
    if (args.length >= fnLength) {
      return add(args)
    } else {
      return add
    }
  }
}

function add(a: number, b: number, c: number) {
  return a + b + c
}

const addCurrie = currie(add)
//addCurrie(1, 2)(3)
console.log(addCurrie(1, 2)(3))
