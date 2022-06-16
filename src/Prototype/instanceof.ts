export function myInstanceof(obj: any, Fn: new () => any): boolean {
  if (Object.prototype.toString.call(obj) === `[object ${Fn.name}]`) {
    return true
  } else {
    return false
  }
}
console.log(myInstanceof({}, Function))

console.log([] instanceof Array)
console.log({} instanceof Object)


console.log({} instanceof Array)
console.log([] instanceof Object)