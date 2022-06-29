function generatorToAsync(generatorFunc: Function) {
  // 返回的是一个新的函数
  return function (this: any) {
    const gen = generatorFunc.apply(this, arguments)

    return new Promise((resolve, reject) => {
      function step(key: any, arg?: any) {
        let generatorResult
        // 内部定义一个step函数 用来一步一步的跨过yield的阻碍
        // key有next和throw两种取值，分别对应了gen的next和throw方法
        // arg参数则是用来把promise resolve出来的值交给下一个yield
        try {
          generatorResult = gen[key](arg)
          //console.log('generatorResult', generatorResult)
        } catch (error) {
          return reject(error)
        }
        const { value, done } = generatorResult
        if (done) {
          return resolve(value)
        } else {
          return Promise.resolve(value).then(
            function onResolve(val) {
              step('next', val)
            },

            function onReject(err) {
              step('throw', err)
            }
          )
        }
      }
      step('next')
    })
  }
}

function* generator(): IterableIterator<number> {
  let a = yield 1
  let b
  if (a) {
    b = yield 3 + a
  }
  let c
  if (b) {
    c = yield 3 + b
  }
  return c
}

console.log(generator())
console.log(generatorToAsync(generator)().then((res) => console.log(res)))
