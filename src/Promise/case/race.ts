/**
 * 模拟延时
 * @param {number} delay 延迟时间
 * @returns {Promise<any>}
 */
function sleep(delay: number) {
  return new Promise((_, reject) => {
    setTimeout(() => reject('超时喽'), delay)
  })
}

/**
 * 模拟请求
 */
function request() {
  // 假设请求需要 1s
  return new Promise((resolve) => {
    setTimeout(() => resolve('成功喽'), 1000)
  })
}

function timeoutPromise(requestFn: Function, delay: number) {
  // 如果先返回的是延迟Promise则说明超时了
  return Promise.race([requestFn(), sleep(delay)])
}

timeoutPromise(request, 1000)
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })

/**
 * 判断是否超时
 * @param {() => Promise<any>} requestFn 请求函数
 * @param {number} delay 延迟时长
 * @returns {Promise<any>}
 */
// function timeoutPromise(requestFn: Function, delay: number) {
//   return new Promise((resolve, reject) => {
//     const promises = [requestFn(), sleep(delay)]
//     for (const promise of promises) {
//       // 超时则执行失败，不超时则执行成功
//       promise.then(
//         (res: any) => resolve(res),
//         (err: any) => reject(err)
//       )
//     }
//   })
// }
