// export function currie(fn: Function) {
//   const fnLength = fn.length
//   let args: any[] = []
//   function calc(this: any, ...newArgs: any[]): any {
//     args = [...args, ...newArgs]
//     if (args.length < fnLength) {
//       return calc
//     } else {
//       return fn.apply(this, args.slice(0, fnLength))   //这里是fn
//     }
//   }
//   return calc
// }

// function add(a: number, b: number, c: number) {
//   return a + b + c
// }

// const addCurrie = currie(add)
// //addCurrie(1, 2)(3)
// console.log(addCurrie(1)(2)(3))

export function currie(fn: Function) {
  const fnLength = fn.length
  const args: any = []
  function calc(this: any, ...arg: any) {
    args.push(...arg)
    if (args.length >= fnLength) {
      return fn.call(this, ...args.slice(0, fnLength))
    } else {
      return calc
    }
  }
  return calc
}

function add(a: number, b: number, c: number) {
  return a + b + c
}

const addCurrie = currie(add)

console.log(addCurrie(1, 2)(3))
