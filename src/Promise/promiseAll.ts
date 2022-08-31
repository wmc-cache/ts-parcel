// function promise1() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve('promise1')
//       console.log('promise1')
//     }, 1000)
//   })
// }
function promise1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error')
      console.log('promise1')
    }, 1000)
  })
}

function promise2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('promise2')
      console.log('promise2')
    }, 2000)
  })
}

function promise3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('promise3')
      console.log('promise3')
    }, 3000)
  })
}

console.time('test')
Promise.all([promise1(), promise2(), promise3()])
  .then((value) => {
    console.log('promise.all执行完毕',value)
    console.timeEnd('test')
  })
  .catch((value) => {
    console.log('promise.all执行失败', value) // 遇到执行回调中第一个失败。会立刻执行自身的reject的回调函数，并且只会抛出第一个失败reject,后续遇到reject均不执行。
    console.timeEnd('test')
  })

// (async function asyncTime() {
//   console.time('aysncTime')
//   await promise1()
//   await promise2()
//   await promise3()
//   console.log('async 执行完毕')
//   console.timeEnd('aysncTime')
// })()
