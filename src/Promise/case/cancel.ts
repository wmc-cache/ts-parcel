// 实现思路：简单说就是，利用Promise.race方法，给每一次请求的身边安装一颗雷，如果第一次请求后，又接了第二次重复请求，
// 那么就执行第一次请求身边的雷，把第一次请求给炸掉，以此类推。

class CancelablePromise {
  private pendingPromise: Promise<any> | null
  private reject: Function
  constructor() {
    this.pendingPromise = null
    this.reject = () => { }
  }

  request(requestFn: Function) {
    if (this.pendingPromise) {
      this.cancel('取消重复请求')
    }

    const promise = new Promise((_, reject) => (this.reject = reject))
    this.pendingPromise = Promise.race([requestFn(), promise])
    return this.pendingPromise
  }

  cancel(reason: string) {
    this.reject(reason)
    this.pendingPromise = null
  }
}

function request(delay: number) {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('最后赢家是我')
      }, delay)
    })
}

const cancelPromise = new CancelablePromise()

// 模拟频繁请求5次
for (let i = 0; i < 5; i++) {
  cancelPromise
    .request(request(2000))
    .then((res: any) => console.log(res)) // 最后一个 最后赢家是我
    .catch((err: any) => console.error(err)) // 前四个 取消重复请求
}

export { }